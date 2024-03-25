import { Module } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { OrderController } from './controllers/order.controller';
import { OrderWebhookService } from './services/order-webhook.service';
import { OrderWebhookController } from './controllers/order-webhook.controller';

@Module({
  providers: [
    OrderService,
    OrderWebhookService,
    {
      provide: 'ORDER_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: { host: process.env.ORDER_DOCKER_FLAG === 'true' ? process.env.ORDER_DOCKER_HOST : '127.0.0.1', port: Number(process.env.ORDER_DOCKER_PORT) },
        });
      },
    },
  ],
  exports: [OrderService],
  controllers: [OrderController, OrderWebhookController],
})
export class OrderModule {}
