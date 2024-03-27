import { Module } from '@nestjs/common';
import { ProductService } from './services/product/product.service';
import { ProductController } from './controllers/product/product.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ProductCategoryService } from './services/category/product-category.service';
import { ProductCategoryController } from './controllers/category/product-category.controller';
import { ProductTagController } from './controllers/tag/product-tag.controller';
import { ProductTagService } from './services/tag/product-tag.service';
import { ProductWebhookService } from './services/product/product-webhook.service';
import { ProductWebhookController } from './controllers/product/product-webhook.controller';
import { ProductTagWebhookController } from './controllers/tag/product-tag-webhook.controller';
import { ProductCategoryWebhookController } from './controllers/category/product-category-webhook.controller';
import { ProductAttributeWebhookController } from './controllers/attribute/product-attribute-webhook.controller';
import { ProductTagWebhookService } from './services/tag/product-tag-webhook.service';
import { ProductCategoryWebhookService } from './services/category/product-category-webhook.service';
import { ProductAttributeWebhookService } from './services/attribute/product-attribute-webhook.service';
import { AttributeStagingService } from './services/attribute/attribute-staging.service';
import { AttributeProductionService } from './services/attribute/attribute-production.service';
import { AttributeStagingController } from './controllers/attribute/attribute-staging.controller';
import { AttributeProductionController } from './controllers/attribute/attribute-production.controller';

@Module({
  providers: [
    // Legacy
    ProductService,
    ProductTagService,
    ProductCategoryService,
    AttributeStagingService,
    AttributeProductionService,
    // Webhook
    ProductWebhookService,
    ProductTagWebhookService,
    ProductCategoryWebhookService,
    ProductAttributeWebhookService,
    {
      provide: 'PRODUCT_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: { host: process.env.PRODUCT_DOCKER_FLAG === 'true' ? process.env.PRODUCT_DOCKER_HOST : 'localhost', port: Number(process.env.PRODUCT_DOCKER_PORT) },
        });
      },
    },
  ],
  controllers: [
    // Legacy
    ProductController,
    ProductTagController,
    ProductCategoryController,
    AttributeStagingController,
    AttributeProductionController,
    // Webhook
    ProductWebhookController,
    ProductTagWebhookController,
    ProductCategoryWebhookController,
    ProductAttributeWebhookController,
  ],
})
export class ProductModule {}
