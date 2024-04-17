import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import entities from './entities';
import { AttributeStagingService } from './services/staging/attribute.staging.service';
import { CategoryStagingService } from './services/staging/category.staging.service';
import { CategoryImageStagingService } from './services/staging/category-image.staging.service';
import { ProductImageStagingService } from './services/staging/product-image.staging.service';
import { ProductStagingService } from './services/staging/product.staging.service';
import { TagStagingService } from './services/staging/tag.staging.service';
import { TypeStagingService } from './services/staging/type.staging.service';
import { AttributeProductionService } from './services/production/attribute.production.service';
import { CategoryProductionService } from './services/production/category.production.service';
import { CategoryImageProductionService } from './services/production/category-image.production.service';
import { ProductImageProductionService } from './services/production/product-image.production.service';
import { ProductProductionService } from './services/production/product.production.service';
import { TagProductionService } from './services/production/tag.production.service';
import { TypeProductionService } from './services/production/type.production.service';
import { AttributeStagingController } from './controllers/staging/attribute.staging.controller';
import { CategoryStagingController } from './controllers/staging/category.staging.controller';
import { ProductStagingController } from './controllers/staging/product.staging.controller';
import { TagStagingController } from './controllers/staging/tag.staging.controller';
import { AttributeProductionController } from './controllers/production/attribute.production.controller';
import { CategoryProductionController } from './controllers/production/category.production.controller';
import { ProductProductionController } from './controllers/production/product.production.controller';
import { TagProductionController } from './controllers/production/tag.production.controller';

@Module({
  imports: [TypeOrmModule.forFeature(entities, 'staging'), TypeOrmModule.forFeature(entities, 'production')],
  controllers: [
    // Staging
    AttributeStagingController,
    CategoryStagingController,
    ProductStagingController,
    TagStagingController,
    // Production
    AttributeProductionController,
    CategoryProductionController,
    ProductProductionController,
    TagProductionController,
  ],
  providers: [
    // Staging
    AttributeStagingService,
    CategoryStagingService,
    CategoryImageStagingService,
    ProductImageStagingService,
    ProductStagingService,
    TagStagingService,
    TypeStagingService,
    // Production
    AttributeProductionService,
    CategoryProductionService,
    CategoryImageProductionService,
    ProductImageProductionService,
    ProductProductionService,
    TagProductionService,
    TypeProductionService,
  ],
  exports: [],
})
export class ProductModule {}
