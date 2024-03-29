import { Module } from '@nestjs/common';
import { JfkService } from './services/jfk.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { JfkStagingService } from './services/jfk-staging.service';
import { JfkProductionService } from './services/jfk-production.service';

@Module({
  imports: [TypeOrmModule.forFeature(entities, 'staging'), TypeOrmModule.forFeature(entities, 'production')],
  providers: [JfkService, JfkStagingService, JfkProductionService],
  exports: [JfkService, JfkStagingService, JfkProductionService],
})
export class JfkModule {}
