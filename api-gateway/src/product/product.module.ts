import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product/product.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ProductCategoryService } from './services/product-category.service';
import { ProductCategoryController } from './controllers/category/product-category.controller';
import { ProductTagController } from './controllers/tag/product-tag.controller';
import { ProductAttributeController } from './controllers/attribute/product-attribute.controller';
import { ProductTagService } from './services/product-tag.service';
import { ProductAttributeServcie } from './services/product-attribute.service';
import { ProductWebhookService } from './services/product-webhook.service';
import { ProductWebhookController } from './controllers/product/product-webhook.controller';
import { ProductTagWebhookController } from './controllers/tag/product-tag-webhook.controller';
import { ProductCategoryWebhookController } from './controllers/category/product-category-webhook.controller';
import { ProductAttributeWebhookController } from './controllers/attribute/product-attribute-webhook.controller';

@Module({
  providers: [
    // Legacy
    ProductService,
    ProductTagService,
    ProductCategoryService,
    ProductAttributeServcie,
    // Webhook
    ProductWebhookService,
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
    ProductAttributeController,
    // Webhook
    ProductWebhookController,
    ProductTagWebhookController,
    ProductCategoryWebhookController,
    ProductAttributeWebhookController,
  ],
})
export class ProductModule {}
