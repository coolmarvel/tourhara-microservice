import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { PaymentStagingService } from './services/payment-staging.service';
import { PaymentProductionService } from './services/payment-production.service';

@Module({
  imports: [TypeOrmModule.forFeature(entities, 'staging'), TypeOrmModule.forFeature(entities, 'production')],
  providers: [PaymentStagingService, PaymentProductionService],
  exports: [PaymentStagingService, PaymentProductionService],
})
export class PaymentModule {}
