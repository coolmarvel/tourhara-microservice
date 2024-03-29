import { Module } from '@nestjs/common';
import { PaymentService } from './services/payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { PaymentStagingService } from './services/payment-staging.service';
import { PaymentProductionService } from './services/payment-production.service';

@Module({
  imports: [TypeOrmModule.forFeature(entities, 'staging'), TypeOrmModule.forFeature(entities, 'production')],
  providers: [PaymentService, PaymentStagingService, PaymentProductionService],
  exports: [PaymentService, PaymentStagingService, PaymentProductionService],
})
export class PaymentModule {}
