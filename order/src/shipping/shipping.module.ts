import { Module } from '@nestjs/common';
import { ShippingService } from './services/shipping.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { ShippingStagingService } from './services/shipping-staging.service';
import { ShippingProductionService } from './services/shipping-production.service';

@Module({
  imports: [TypeOrmModule.forFeature(entities, 'staging'), TypeOrmModule.forFeature(entities, 'production')],
  providers: [ShippingService, ShippingStagingService, ShippingProductionService],
  exports: [ShippingService, ShippingStagingService, ShippingProductionService],
})
export class ShippingModule {}
