import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as basicAuth from 'express-basic-auth';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);
  const port = 3000;

  app.enableCors({ origin: true, methods: 'GET,HEAD,PUT,PATH,POST,DELETE,OPTIONS', credentials: true });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.use(['/docs', '/docs-json'], basicAuth({ challenge: true, users: { [configService.get('swagger.username')]: configService.get('swagger.password') } }));

  const config = new DocumentBuilder().setTitle('').setDescription('').setVersion('1.0.0').addBearerAuth().build();
  const customOptions: SwaggerCustomOptions = { swaggerOptions: { persistAuthorization: true } };
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, customOptions);

  await app.listen(port);

  console.log(`🚀 Server is listening on http://localhost:${port}`);
  console.log(`📚 Swagger API documentation available at http://localhost:${port}/docs`);
}
bootstrap();
