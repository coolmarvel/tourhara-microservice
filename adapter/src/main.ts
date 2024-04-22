import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: { host: 'localhost', port: 3004 },
  });

  await app.listen();
  console.log(`🚀 ADAPTER-SERVICE is listening on http://localhost:${3004} for TCP`);
}
bootstrap();
