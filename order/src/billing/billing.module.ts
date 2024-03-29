import { Module } from '@nestjs/common';
import { BillingService } from './services/billing.service';
import entities from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingStagingService } from './services/billing-staging.service';
import { BillingProductionService } from './services/billing-production.service';

@Module({
  imports: [TypeOrmModule.forFeature(entities, 'staging'), TypeOrmModule.forFeature(entities, 'production')],
  providers: [BillingService, BillingStagingService, BillingProductionService],
  controllers: [],
  exports: [BillingService, BillingStagingService, BillingProductionService],
})
export class BillingModule {}
