import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { CategoryModule } from 'src/woocommerce/category/category.module';
import { TagModule } from 'src/woocommerce/tag/tag.module';
import { AttributeModule } from 'src/woocommerce/attribute/attribute.module';
import { ProductStagingService } from './services/product-staging.service';
import { ProductProductionService } from './services/product-production.service';
import { ProductProductionController } from './controllers/product-production.controller';
import { ProductStagingController } from './controllers/product-staging.controller';

@Module({
  imports: [TypeOrmModule.forFeature(entities, 'staging'), TypeOrmModule.forFeature(entities, 'production'), CategoryModule, TagModule, AttributeModule],
  providers: [ProductStagingService, ProductProductionService],
  controllers: [ProductStagingController, ProductProductionController],
})
export class ProductModule {}
