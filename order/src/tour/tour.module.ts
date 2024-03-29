import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { TourStagingService } from './services/tour-staging.service';
import { TourProductionService } from './services/tour-production.service';

@Module({
  imports: [TypeOrmModule.forFeature(entities, 'staging'), TypeOrmModule.forFeature(entities, 'production')],
  providers: [TourStagingService, TourProductionService],
  exports: [TourStagingService, TourProductionService],
})
export class TourModule {}
