import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { BillingModule } from 'src/billing/billing.module';
import { ShippingModule } from 'src/shipping/shipping.module';
import { PaymentModule } from 'src/payment/payment.module';
import { GuestHouseModule } from 'src/guest-house/guest-house.module';
import { TourModule } from 'src/tour/tour.module';
import { UsimModule } from 'src/usim/usim.module';
import { JfkModule } from 'src/jfk/jfk.module';
import { OrderStagingService } from './services/order-staging.service';
import { OrderProductionService } from './services/order-production.service';
import { OrderStagingController } from './controllers/order-staging.controller';
import { OrderProductionController } from './controllers/order-production.controller';
import { LineItemModule } from 'src/line-item/line-item.module';
import { CheckListModule } from 'src/check-list/check-list.module';

@Module({
  imports: [
    BillingModule,
    ShippingModule,
    PaymentModule,
    GuestHouseModule,
    TourModule,
    UsimModule,
    JfkModule,
    LineItemModule,
    CheckListModule,
    TypeOrmModule.forFeature(entities, 'staging'),
    TypeOrmModule.forFeature(entities, 'production'),
  ],
  providers: [OrderStagingService, OrderProductionService],
  controllers: [OrderStagingController, OrderProductionController],
})
export class OrderModule {}
