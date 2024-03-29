import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { UsimStagingService } from './services/usim-staging.service';
import { UsimProductionService } from './services/usim-production.service';

@Module({
  imports: [TypeOrmModule.forFeature(entities, 'staging'), TypeOrmModule.forFeature(entities, 'production')],
  providers: [UsimStagingService, UsimProductionService],
  exports: [UsimStagingService, UsimProductionService],
})
export class UsimModule {}
