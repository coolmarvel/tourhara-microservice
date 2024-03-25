import { Module } from '@nestjs/common';
import { TourService } from './services/tour.service';
import { TourController } from './controllers/tour.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';

@Module({
  imports: [TypeOrmModule.forFeature(entities, 'staging'), TypeOrmModule.forFeature(entities, 'production')],
  providers: [TourService],
  controllers: [TourController],
  exports: [TourService],
})
export class TourModule {}
