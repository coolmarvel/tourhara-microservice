import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { ProductService } from '../services/product.service';
import { CreateProductReqDto, DeleteProductReqDto, PageReqDto, RetrieveProductReqDto, UpdateProductReqDto } from '../dtos/req.dto';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern({ cmd: 'createAProduct' })
  async createAProduct(data: CreateProductReqDto) {
    return await this.productService.createAProduct(data);
  }

  @MessagePattern({ cmd: 'retrieveAProduct' })
  async retrieveAProduct({ product_id }: RetrieveProductReqDto) {
    return await this.productService.retrieveAProduct(product_id);
  }

  @MessagePattern({ cmd: 'listAllProducts' })
  async listAllProducts({ page, size }: PageReqDto) {
    return await this.productService.listAllProducts(page, size);
  }

  @MessagePattern({ cmd: 'updateAProduct' })
  async updateAProduct({ product_id, data }: UpdateProductReqDto) {
    return await this.productService.updateAProduct(product_id, data);
  }

  @MessagePattern({ cmd: 'deleteAProduct' })
  async deleteAProduct({ product_id }: DeleteProductReqDto) {
    return await this.productService.deleteAProduct(product_id);
  }
}
