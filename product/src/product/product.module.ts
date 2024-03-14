import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { ProductCateogryController } from './controllers/product-category.controller';
import { ProductCategoryService } from './services/product-cateogry.service';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [ProductService, ProductCategoryService],
  controllers: [ProductController, ProductCateogryController],
})
export class ProductModule {}
