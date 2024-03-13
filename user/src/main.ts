import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.USER_DOCKER_FLAG === 'true' ? process.env.USER_DOCKER_HOST : 'localhost',
      port: Number(process.env.USER_DOCKER_PORT),
    },
  });

  const configService: ConfigService = app.get(ConfigService);
  const port = 3001;

  await app.listen();

  console.log(`🚀 USER-SERVICE is listening on http://localhost:${port} for TCP`);
}
bootstrap();
