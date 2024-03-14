import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.PRODUCT_DOCKER_FLAG === 'true' ? process.env.PRODUCT_DOCKER_HOST : 'localhost',
      port: Number(process.env.PRODUCT_DOCKER_PORT),
    },
  });

  const configService: ConfigService = app.get(ConfigService);
  const port = 3003;

  await app.listen();

  console.log(`🚀 PRODUCT-SERVICE is listening on http://localhost:${port} for TCP`);
}
bootstrap();
