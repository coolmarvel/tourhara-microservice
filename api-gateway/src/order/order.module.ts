import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import OrderStagingService from './services/staging/order.staging.service';
import { OrderProductionService } from './services/production/order.production.service';
import { OrderStagingController } from './controllers/staging/order.staging.controller';
import { OrderProductionController } from './controllers/production/order.production.controller';

@Module({
  providers: [
    OrderStagingService,
    OrderProductionService,
    {
      provide: 'ORDER_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: { host: process.env.ORDER_DOCKER_FLAG === 'true' ? process.env.ORDER_DOCKER_HOST : 'localhost', port: Number(process.env.ORDER_DOCKER_PORT) },
        });
      },
    },
  ],
  controllers: [OrderStagingController, OrderProductionController],
  exports: [OrderStagingService, OrderProductionService],
})
export class OrderModule {}
