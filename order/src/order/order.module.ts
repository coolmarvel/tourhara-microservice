import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { BillingStagingService } from './services/staging/billing.staging.service';
import { CheckListStagingService } from './services/staging/check-list.staging.service';
import { GuestHouseStagingService } from './services/staging/guest-house.staging.service';
import { JfkStagingService } from './services/staging/jfk.staging.service';
import { LineItemStagingService } from './services/staging/line-item.staging.service';
import { LineItemMetadataStagingService } from './services/staging/line-item-metadata.staging.service';
import { OrderStagingService } from './services/staging/order.staging.service';
import { OrderMetadataStagingService } from './services/staging/order-metadata.staging.service';
import { PaymentStagingService } from './services/staging/payment.staging.service';
import { ShippingStagingService } from './services/staging/shipping.staging.service';
import { TourStagingService } from './services/staging/tour.staging.service';
import { UsimStagingService } from './services/staging/usim.staging.service';
import { BillingProductionService } from './services/production/billing.production.service';
import { CheckListProductionService } from './services/production/check-list.production.service';
import { GuestHouseProductionService } from './services/production/guest-house.production.service';
import { JfkProductionService } from './services/production/jfk.production.service';
import { LineItemProductionService } from './services/production/line-item.production.service';
import { LineItemMetadataProductionService } from './services/production/line-item-metadata.production.service';
import { OrderProductionService } from './services/production/order.production.service';
import { OrderMetadataProductionService } from './services/production/order-metadata.production.service';
import { PaymentProductionService } from './services/production/payment.production.service';
import { ShippingProductionService } from './services/production/shipping.production.service';
import { TourProductionService } from './services/production/tour.production.service';
import { UsimProductionService } from './services/production/usim.production.service';
import { OrderStagingController } from './controllers/staging/order.staging.controller';
import { OrderProductionController } from './controllers/production/order.production.controller';

@Module({
  imports: [TypeOrmModule.forFeature(entities, 'staging'), TypeOrmModule.forFeature(entities, 'production')],
  controllers: [OrderStagingController, OrderProductionController],
  providers: [
    // Staging
    BillingStagingService,
    CheckListStagingService,
    GuestHouseStagingService,
    JfkStagingService,
    LineItemStagingService,
    LineItemMetadataStagingService,
    OrderStagingService,
    OrderMetadataStagingService,
    PaymentStagingService,
    ShippingStagingService,
    TourStagingService,
    UsimStagingService,
    // Production
    BillingProductionService,
    CheckListProductionService,
    GuestHouseProductionService,
    JfkProductionService,
    LineItemProductionService,
    LineItemMetadataProductionService,
    OrderProductionService,
    OrderMetadataProductionService,
    PaymentProductionService,
    ShippingProductionService,
    TourProductionService,
    UsimProductionService,
  ],
  exports: [],
})
export class OrderModule {}
