import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { ProductWebhookService } from './services/product-webhook.service';
import { ProductWebhookController } from './controllers/product-webhook.controller';
import { CategoryModule } from 'src/woocommerce/category/category.module';
import { TagModule } from 'src/woocommerce/tag/tag.module';
import { AttributeModule } from 'src/woocommerce/attribute/attribute.module';

@Module({
  imports: [TypeOrmModule.forFeature(entities, 'staging'), TypeOrmModule.forFeature(entities, 'production'), CategoryModule, TagModule, AttributeModule],
  providers: [ProductService, ProductWebhookService],
  controllers: [ProductController, ProductWebhookController],
})
export class ProductModule {}
