import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import entities from './entities';
import { OrderController } from './controllers/order.controller';
import { LineItemMetadataService } from './services/line-item-metadata.service';
import { BillingService } from './services/billing.service';
import { GuestHouseService } from './services/guest-house.service';
import { JfkService } from './services/jfk.service';
import { LineItemService } from './services/line-item.service';
import { OrderMetadataService } from './services/order-metadata.service';
import { PaymentService } from './services/payment.service';
import { ShippingService } from './services/shipping.service';
import { TourService } from './services/tour.service';
import { UsimService } from './services/usim.service';
import { OrderService } from './services/order.service';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [OrderController],
  providers: [LineItemMetadataService, BillingService, GuestHouseService, JfkService, LineItemService, OrderMetadataService, PaymentService, ShippingService, TourService, UsimService, OrderService],
})
export class OrderModule {}
