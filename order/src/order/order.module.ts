import { Module } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { OrderController } from './controllers/order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { BillingModule } from 'src/billing/billing.module';
import { ShippingModule } from 'src/shipping/shipping.module';
import { PaymentModule } from 'src/payment/payment.module';
import { GuestHouseModule } from 'src/guest-house/guest-house.module';
import { TourModule } from 'src/tour/tour.module';
import { UsimModule } from 'src/usim/usim.module';
import { JfkModule } from 'src/jfk/jfk.module';
import { OrderWebhookService } from './services/order-webhook.service';
import { OrderWebhookController } from './controllers/order-webhook.controller';
import { OrderStagingService } from './services/order-staging.service';
import { OrderProductionService } from './services/order-production.service';
import { OrderStagingController } from './controllers/order-staging.controller';
import { OrderProductionController } from './controllers/order-production.controller';

@Module({
  imports: [
    BillingModule,
    ShippingModule,
    PaymentModule,
    GuestHouseModule,
    TourModule,
    UsimModule,
    JfkModule,
    TypeOrmModule.forFeature(entities, 'staging'),
    TypeOrmModule.forFeature(entities, 'production'),
  ],
  providers: [OrderService, OrderWebhookService, OrderStagingService, OrderProductionService],
  controllers: [OrderController, OrderWebhookController, OrderStagingController, OrderProductionController],
})
export class OrderModule {}
