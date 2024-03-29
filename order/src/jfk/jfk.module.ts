import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { JfkStagingService } from './services/jfk-staging.service';
import { JfkProductionService } from './services/jfk-production.service';

@Module({
  imports: [TypeOrmModule.forFeature(entities, 'staging'), TypeOrmModule.forFeature(entities, 'production')],
  providers: [JfkStagingService, JfkProductionService],
  exports: [JfkStagingService, JfkProductionService],
})
export class JfkModule {}
