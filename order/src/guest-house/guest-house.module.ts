import { Module } from '@nestjs/common';
import { GuestHouseService } from './services/guest-house.service';
import { GuestHouseController } from './controllers/guest-house.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [GuestHouseService],
  controllers: [GuestHouseController],
  exports: [GuestHouseService],
})
export class GuestHouseModule {}
