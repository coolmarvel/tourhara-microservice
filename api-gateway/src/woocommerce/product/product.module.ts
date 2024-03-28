import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
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
import { CategoryStagingService } from './services/category/category-staging.service';
import { CategoryProductionService } from './services/category/category-production.service';
import { CategoryStagingController } from './controllers/category/category-staging.controller';
import { CategoryProductionController } from './controllers/category/category-production.controller';
import { TagStagingService } from './services/tag/tag-staging.service';
import { TagProductionService } from './services/tag/tag-production.service';
import { TagStagingController } from './controllers/tag/tag-staging.controller';
import { TagProductionController } from './controllers/tag/tag-production.controller';
import { ProductStagingService } from './services/product/product-staging.service';
import { ProductProductionService } from './services/product/product-production.service';
import { ProductStagingController } from './controllers/product/product-staging.controller';
import { ProductProductionController } from './controllers/product/product-production.controller';

@Module({
  providers: [
    // Legacy
    ProductStagingService,
    ProductProductionService,
    TagStagingService,
    TagProductionService,
    CategoryStagingService,
    CategoryProductionService,
    AttributeStagingService,
    AttributeProductionService,
    // Webhook
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
    ProductStagingController,
    TagStagingController,
    CategoryStagingController,
    AttributeStagingController,
    ProductProductionController,
    TagProductionController,
    CategoryProductionController,
    AttributeProductionController,
    // Webhook
    ProductTagWebhookController,
    ProductCategoryWebhookController,
    ProductAttributeWebhookController,
  ],
})
export class ProductModule {}
