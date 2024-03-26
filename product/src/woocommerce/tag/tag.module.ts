import { Module } from '@nestjs/common';
import { TagService } from './services/tag.service';
import { TagController } from './controllers/tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { TagWebhookService } from './services/tag-webhook.service';
import { TagWebhookController } from './controllers/tag-webhook.controller';

@Module({
  imports: [TypeOrmModule.forFeature(entities, 'staging'), TypeOrmModule.forFeature(entities, 'production')],
  providers: [TagService, TagWebhookService],
  controllers: [TagController, TagWebhookController],
  exports: [TagService],
})
export class TagModule {}
