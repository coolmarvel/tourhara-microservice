import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import OrderStagingService from './services/order-staging.service';
import { OrderProductionService } from './services/order-production.service';
import { OrderStagingController } from './controllers/order-staging.controller';
import { OrderProductionController } from './controllers/order-production.controller';

@Module({
  providers: [
    {
      provide: 'ORDER_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: { host: process.env.ORDER_DOCKER_FLAG === 'true' ? process.env.ORDER_DOCKER_HOST : 'localhost', port: Number(process.env.ORDER_DOCKER_PORT) },
        });
      },
    },
    OrderStagingService,
    OrderProductionService,
  ],
  exports: [OrderStagingService, OrderProductionService],
  controllers: [OrderStagingController, OrderProductionController],
})
export class OrderModule {}
