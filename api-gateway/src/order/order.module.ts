import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { OrderService } from './services/order.service';
import { WebhookService } from './services/webhook.service';

import { OrderController } from './controllers/order.controller';
import { WebhookController } from './controllers/webhook.controller';

@Module({
  providers: [
    OrderService,
    WebhookService,
    {
      provide: 'ORDER_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({ transport: Transport.TCP, options: { host: process.env.ORDER_HOST ?? 'localhost', port: parseInt(process.env.ORDER_PORT, 10) } });
      },
    },
  ],
  controllers: [OrderController, WebhookController],
  exports: [OrderService, WebhookService],
})
export class OrderModule {}
