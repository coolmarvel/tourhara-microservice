import { ClassSerializerInterceptor, ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

import * as basicAuth from 'express-basic-auth';
import { useContainer } from 'class-validator';

import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.env.NODE_ENV === 'production' ? '.env.production' : process.env.NODE_ENV === 'stage' ? '.env.staging' : '.env') });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || parseInt(process.env.PORT, 10);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.enableCors({ origin: true, methods: 'GET,HEAD,PUT,PATH,POST,DELETE,OPTIONS', credentials: true });
  app.enableShutdownHooks();
  app.enableVersioning({ type: VersioningType.URI });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.use(['/docs', '/docs-json'], basicAuth({ challenge: true, users: { [configService.get('swagger.username')]: configService.get('swagger.password') } }));

  const config = new DocumentBuilder().setTitle('MSA PROJECT').setDescription('BackOffcie with WooCommerce').setVersion('2.0.0').addBearerAuth().build();
  const customOptions: SwaggerCustomOptions = { swaggerOptions: { persistAuthorization: true } };
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, customOptions);

  await app.listen(port);

  console.log(`🚀 Server is listening on http://localhost:${port}`);
  console.log(`📚 Swagger API documentation available at http://localhost:${port}/docs`);
}
bootstrap();
