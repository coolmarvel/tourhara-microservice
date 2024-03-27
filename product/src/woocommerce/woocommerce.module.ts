import { Module } from '@nestjs/common';
import { AttributeModule } from './attribute/attribute.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [AttributeModule, CategoryModule, ProductModule, TagModule],
})
export class WoocommerceModule {}
