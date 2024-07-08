import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import entities from './entities';
import { AdapterService } from './services/adapter.service';
import { AdapterController } from './controllers/adapter.controller';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [AdapterService],
  controllers: [AdapterController],
})
export class AdapterModule {}
