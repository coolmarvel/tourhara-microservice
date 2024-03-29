import { Module } from '@nestjs/common';
import { UsimService } from './services/usim.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { UsimStagingService } from './services/usim-staging.service';
import { UsimProductionService } from './services/usim-production.service';

@Module({
  imports: [TypeOrmModule.forFeature(entities, 'staging'), TypeOrmModule.forFeature(entities, 'production')],
  providers: [UsimService, UsimStagingService, UsimProductionService],
  exports: [UsimService, UsimStagingService, UsimProductionService],
})
export class UsimModule {}
