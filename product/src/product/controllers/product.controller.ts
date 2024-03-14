import { Controller } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // WooCommerce Staging Order APIs

  // WooCommerce Staging Order APIs
  @MessagePattern({ cmd: 'listAllProducts_prod' })
  async listAllProducts_prod({ page, size }: { page: number; size: number }) {
    return await this.productService.listAllProducts_prod(page, size);
  }
}
