import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, ValidationPipe, VersioningType } from '@nestjs/common';
import * as basicAuth from 'express-basic-auth';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);
  const port = 3000;

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.enableCors({ origin: true, methods: 'GET,HEAD,PUT,PATH,POST,DELETE,OPTIONS', credentials: true });
  app.enableShutdownHooks();
  app.enableVersioning({ type: VersioningType.URI });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.use(['/docs', '/docs-json'], basicAuth({ challenge: true, users: { [configService.get('swagger.username')]: configService.get('swagger.password') } }));

  const config = new DocumentBuilder()
    .setTitle('MSA Project')
    .setDescription('BackOffcie with WooCommerce')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const customOptions: SwaggerCustomOptions = { swaggerOptions: { persistAuthorization: true } };
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, customOptions);

  await app.listen(port);

  console.log(`🚀 Server is listening on http://localhost:${port}`);
  console.log(`📚 Swagger API documentation available at http://localhost:${port}/docs`);
}
bootstrap();
