import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { OrderService } from './services/order.service';
import { OrderController } from './controllers/order.controller';

@Module({
  providers: [
    OrderService,
    {
      provide: 'ORDER_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({ transport: Transport.TCP, options: { host: process.env.ORDER_HOST ?? 'localhost', port: parseInt(process.env.ORDER_PORT, 10) } });
      },
    },
  ],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
