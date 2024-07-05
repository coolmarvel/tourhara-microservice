import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import entities from './entities';
import { AttributeController } from './controllers/attribute.controller';
import { ProductController } from './controllers/product.controller';
import { TagController } from './controllers/tag.controller';
import { CategoryController } from './controllers/category.controller';
import { AttributeService } from './services/attribute.service';
import { ProductService } from './services/product.service';
import { TagService } from './services/tag.service';
import { CategoryService } from './services/category.service';
import { ProductImageService } from './services/product-image.service';
import { CategoryImageService } from './services/category-image.service';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [AttributeController, TagController, CategoryController, ProductController],
  providers: [AttributeService, TagService, CategoryService, CategoryImageService, ProductImageService, ProductService],
})
export class ProductModule {}
