import { Module } from '@nestjs/common';
import { TourService } from './services/tour.service';
import { TourController } from './controllers/tour.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [TourService],
  controllers: [TourController],
})
export class TourModule {}
