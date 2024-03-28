import { Module } from '@nestjs/common';
import { CategoryService } from './services/category.service';
import { CategoryController } from './controllers/category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { CategoryWebhookController } from './controllers/category-webhook.controller';
import { CategoryWebhookService } from './services/category-webhook.service';
import { CategoryStagingService } from './services/category-staging.service';
import { CategoryProductionService } from './services/category-production.service';
import { CategoryStagingController } from './controllers/category_staging.controller';
import { CategoryProductionController } from './controllers/category-production.controller';

@Module({
  imports: [TypeOrmModule.forFeature(entities, 'staging'), TypeOrmModule.forFeature(entities, 'production')],
  providers: [CategoryService, CategoryWebhookService, CategoryStagingService, CategoryProductionService],
  controllers: [CategoryController, CategoryWebhookController, CategoryStagingController, CategoryProductionController],
  exports: [CategoryService, CategoryStagingService, CategoryProductionService],
})
export class CategoryModule {}
