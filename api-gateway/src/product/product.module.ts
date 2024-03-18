import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ProductCategoryService } from './services/product-category.service';
import { ProductCategoryController } from './controllers/product-category.controller';
import { ProductTagController } from './controllers/product-tag.controller';
import { ProductAttributeController } from './controllers/product-attribute.controller';
import { ProductTagService } from './services/product-tag.service';
import { ProductAttributeServcie } from './services/product-attribute.service';

@Module({
  providers: [
    ProductService,
    ProductTagService,
    ProductCategoryService,
    ProductAttributeServcie,
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
  controllers: [ProductController, ProductCategoryController, ProductTagController, ProductAttributeController],
})
export class ProductModule {}
