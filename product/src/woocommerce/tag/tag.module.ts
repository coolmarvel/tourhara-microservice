import { Module } from '@nestjs/common';
import { TagService } from './services/tag.service';
import { TagController } from './controllers/tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { TagWebhookService } from './services/tag-webhook.service';
import { TagWebhookController } from './controllers/tag-webhook.controller';
import { TagStagingService } from './services/tag-staging.service';
import { TagProductionService } from './services/tag-production.service';
import { TagStagingController } from './controllers/tag-staging.controller';
import { TagProductionController } from './controllers/tag-production.controller';

@Module({
  imports: [TypeOrmModule.forFeature(entities, 'staging'), TypeOrmModule.forFeature(entities, 'production')],
  providers: [TagService, TagWebhookService, TagStagingService, TagProductionService],
  controllers: [TagController, TagWebhookController, TagStagingController, TagProductionController],
  exports: [TagService, TagProductionService, TagStagingService],
})
export class TagModule {}
