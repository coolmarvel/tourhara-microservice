import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.env.NODE_ENV === 'production' ? '.env.production' : process.env.NODE_ENV === 'stage' ? '.env.staging' : '.env') });

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: { host: process.env.HOST ?? 'localhost', port: parseInt(process.env.PORT, 10) },
  });

  const configService: ConfigService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  await app.listen();

  console.log(`🚀 PRODUCT-SERVICE is listening on http://localhost:${port} for TCP`);
}

bootstrap();
