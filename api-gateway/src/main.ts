import { ClassSerializerInterceptor, ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { json, urlencoded } from 'express';

import { AppModule } from './app.module';

import session from 'express-session';

import basicAuth from 'express-basic-auth';
import { useContainer } from 'class-validator';

import * as dotenv from 'dotenv';
import * as path from 'path';

import passport from 'passport';
import { Transport } from '@nestjs/microservices';

dotenv.config({ path: path.resolve(process.env.NODE_ENV === 'production' ? '.env.production' : process.env.NODE_ENV === 'staging' ? '.env.staging' : '.env') });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || parseInt(process.env.PORT, 10);

  app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      host: configService.get(process.env.REDIS_HOST) || 'localhost',
      port: +configService.get(process.env.REDIS_PORT) || 6379,
      password: configService.get('REDIS_PASSWORD'),
    },
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.enableCors({
    origin: 'http://localhost:8080',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATH,POST,DELETE,OPTIONS',
  });

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: Number(process.env.COOKIE_MAX_AGE),
        httpOnly: true,
        secure: false,
        sameSite: 'none',
      },
    }),
  );

  // NestJS Passport 권장 설정
  app.use(passport.initialize());
  app.use(passport.session());

  app.enableShutdownHooks();
  app.enableVersioning({ type: VersioningType.URI });

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.use(
    ['/docs', '/docs-json'],
    basicAuth({
      challenge: true,
      users: { [configService.get('swagger.username')]: configService.get('swagger.password') },
    }),
  );

  const config = new DocumentBuilder().setTitle('MSA PROJECT').setDescription('BackOffcie with WooCommerce').setVersion('2.0.0').addBearerAuth().build();

  const customOptions: SwaggerCustomOptions = { swaggerOptions: { persistAuthorization: true } };
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, customOptions);

  await app.listen(port);

  console.log(`🚀 Server is listening on http://localhost:${port}`);
  console.log(`📚 Swagger API documentation available at http://localhost:${port}/docs`);
}

bootstrap();
