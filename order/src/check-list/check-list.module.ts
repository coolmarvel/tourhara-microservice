import { Module } from '@nestjs/common';
import { CheckListStagingService } from './services/check-list-staging.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { CheckListProductionService } from './services/check-list-production.service';

@Module({
  imports: [TypeOrmModule.forFeature(entities, 'staging'), TypeOrmModule.forFeature(entities, 'production')],
  providers: [CheckListStagingService, CheckListProductionService],
  exports: [CheckListStagingService, CheckListProductionService],
})
export class CheckListModule {}
