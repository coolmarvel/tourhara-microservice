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

@Module({
  imports: [TypeOrmModule.forFeature(entities), BillingModule, ShippingModule, PaymentModule, GuestHouseModule, TourModule],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
