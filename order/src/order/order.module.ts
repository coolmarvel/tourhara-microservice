import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import entities from './entities';
import { OrderController } from './controllers';
import {
  BillingService,
  GuestHouseService,
  H2oUsimService,
  JfkOnewayService,
  JfkShuttleRtService,
  LineItemMetadataService,
  LineItemService,
  OrderMetadataService,
  OrderService,
  PaymentService,
  RestApiService,
  ShippingService,
  SnapInfoService,
  TourInfoService,
  TourService,
  UsimInfoService,
  WebhookService,
} from './services';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [OrderController],
  providers: [
    BillingService,
    GuestHouseService,
    H2oUsimService,
    JfkOnewayService,
    JfkShuttleRtService,
    LineItemMetadataService,
    LineItemService,
    OrderMetadataService,
    OrderService,
    PaymentService,
    ShippingService,
    SnapInfoService,
    TourInfoService,
    TourService,
    UsimInfoService,
    RestApiService,
    WebhookService,
  ],
})
export class OrderModule {}
