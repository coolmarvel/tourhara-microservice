import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { GuestHouseStagingService } from './services/guest-house-staging.service';
import { GuestHouseProductionService } from './services/guest-house.production.service';

@Module({
  imports: [TypeOrmModule.forFeature(entities, 'staging'), TypeOrmModule.forFeature(entities, 'production')],
  providers: [GuestHouseStagingService, GuestHouseProductionService],
  exports: [GuestHouseStagingService, GuestHouseProductionService],
})
export class GuestHouseModule {}
