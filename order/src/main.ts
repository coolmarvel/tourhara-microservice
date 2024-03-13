import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.ORDER_DOCKER_FLAG === 'true' ? process.env.ORDER_DOCKER_HOST : 'localhost',
      port: Number(process.env.ORDER_DOCKER_PORT),
    },
  });

  const configService: ConfigService = app.get(ConfigService);
  const port = 3002;

  await app.listen();

  console.log(`🚀 ORDER-SERVICE is listening on http://localhost:${port} for TCP`);
}
bootstrap();
