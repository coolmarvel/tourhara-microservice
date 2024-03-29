import { Module } from '@nestjs/common';
import { TourService } from './services/tour.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { TourStagingService } from './services/tour-staging.service';
import { TourProductionService } from './services/tour-production.service';

@Module({
  imports: [TypeOrmModule.forFeature(entities, 'staging'), TypeOrmModule.forFeature(entities, 'production')],
  providers: [TourService, TourStagingService, TourProductionService],
  exports: [TourService, TourStagingService, TourProductionService],
})
export class TourModule {}
