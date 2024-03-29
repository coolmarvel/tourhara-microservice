import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { TagStagingService } from './services/tag-staging.service';
import { TagProductionService } from './services/tag-production.service';
import { TagStagingController } from './controllers/tag-staging.controller';
import { TagProductionController } from './controllers/tag-production.controller';

@Module({
  imports: [TypeOrmModule.forFeature(entities, 'staging'), TypeOrmModule.forFeature(entities, 'production')],
  providers: [TagStagingService, TagProductionService],
  controllers: [TagStagingController, TagProductionController],
  exports: [TagProductionService, TagStagingService],
})
export class TagModule {}
