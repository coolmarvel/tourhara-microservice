import { Module } from '@nestjs/common';
import { AdapterStagingService } from './services/staging/adapter.staging.service';
import { AdapterStagingController } from './controllers/staging/adapter.staging.controller';
import { AdapterProductionService } from './services/production/adapter.production.service';
import { AdapterProductionController } from './controllers/production/adapter.production.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';

@Module({
  imports: [TypeOrmModule.forFeature(entities, 'staging'), TypeOrmModule.forFeature(entities, 'production')],
  providers: [AdapterStagingService, AdapterProductionService],
  controllers: [AdapterStagingController, AdapterProductionController],
})
export class AdapterModule {}
