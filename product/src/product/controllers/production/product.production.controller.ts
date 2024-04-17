import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProductProductionService } from 'src/product/services/production/product.production.service';
import { CreateProductReqDto, DeleteProductReqDto, PageReqDto, RetrieveProductReqDto, UpdateProductReqDto } from 'src/product/dtos/req.dto';

@Controller()
export class ProductProductionController {
  constructor(private readonly productService: ProductProductionService) {}

  @MessagePattern({ cmd: 'createAProduct_production' })
  async createAProduct(data: CreateProductReqDto) {
    return await this.productService.createAProduct(data);
  }

  @MessagePattern({ cmd: 'retrieveAProduct_production' })
  async retrieveAProduct({ product_id }: RetrieveProductReqDto) {
    return await this.productService.retrieveAProduct(product_id);
  }

  @MessagePattern({ cmd: 'listAllProducts_production' })
  async listAllProducts({ page, size }: PageReqDto) {
    return await this.productService.listAllProducts(page, size);
  }

  @MessagePattern({ cmd: 'updateAProduct_production' })
  async updateAProduct({ product_id, data }: UpdateProductReqDto) {
    return await this.productService.updateAProduct(product_id, data);
  }

  @MessagePattern({ cmd: 'deleteAProduct_production' })
  async deleteAProduct({ product_id }: DeleteProductReqDto) {
    return await this.productService.deleteAProduct(product_id);
  }
}
