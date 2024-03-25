import { Module } from '@nestjs/common';
import { CategoryService } from './services/category.service';
import { CategoryController } from './controllers/category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { CategoryWebhookController } from './controllers/category-webhook.controller';
import { CategoryWebhookService } from './services/category-webhook.service';

@Module({
  imports: [TypeOrmModule.forFeature(entities, 'staging'), TypeOrmModule.forFeature(entities, 'production'),],
  providers: [CategoryService, CategoryWebhookService],
  controllers: [CategoryController, CategoryWebhookController],
  exports: [CategoryService],
})
export class CategoryModule {}
