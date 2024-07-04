import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AttributeService } from './services/attribute.service';
import { CategoryService } from './services/category.service';
import { TagService } from './services/tag.service';
import { ProductService } from './services/product.service';
import { AttributeController } from './controllers/attribute.controller';
import { CategoryController } from './controllers/category.controller';
import { TagController } from './controllers/tag.controller';
import { ProductController } from './controllers/product.controller';

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
  ],
  controllers: [AttributeController, CategoryController, TagController, ProductController],
})
export class ProductModule {}
