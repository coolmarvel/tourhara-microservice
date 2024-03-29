import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { CouponeLineStagingService } from './services/coupon-line-staging.service';
import { CouponeLineProductionService } from './services/coupone-line-production.service';

@Module({
  imports: [TypeOrmModule.forFeature(entities, 'staging'), TypeOrmModule.forFeature(entities, 'production')],
  providers: [CouponeLineStagingService, CouponeLineProductionService],
  exports: [CouponeLineStagingService, CouponeLineProductionService],
})
export class CouponLineModule {}
