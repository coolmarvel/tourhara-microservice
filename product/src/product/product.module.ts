import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';

@Module({
  imports: [],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
