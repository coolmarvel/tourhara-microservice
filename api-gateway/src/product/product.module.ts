import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';

import { AttributeService } from './services/attribute.service';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { TagService } from './services/tag.service';
import { WebhookService } from './services/webhook.service';

import { AttributeController } from './controllers/attribute.controller';
import { CategoryController } from './controllers/category.controller';
import { ProductController } from './controllers/product.controller';
import { TagController } from './controllers/tag.controller';
import { WebhookController } from './controllers/webhook.controller';

@Module({
  providers: [
    {
      provide: 'PRODUCT_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({ transport: Transport.TCP, options: { host: process.env.PRODUCT_HOST ?? 'localhost', port: parseInt(process.env.PRODUCT_PORT, 10) } });
      },
    },
    AttributeService,
    CategoryService,
    ProductService,
    TagService,
    WebhookService,
  ],
  controllers: [AttributeController, CategoryController, TagController, ProductController, WebhookController],
})
export class ProductModule {}
