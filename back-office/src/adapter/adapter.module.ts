import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdapterStagingService } from './services/adapter-staging.service';
import { AdapterProductionService } from './services/adapter-production.service';
import { AdapterStagingController } from './controllers/adapter-staging.controller';
import { AdapterProductionController } from './controllers/adapter-production.controller';

import entities from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature(entities, 'staging'),
    TypeOrmModule.forFeature(entities, 'production'),
  ],
  providers: [AdapterStagingService, AdapterProductionService],
  controllers: [AdapterStagingController, AdapterProductionController],
})
export class AdapterModule {}
