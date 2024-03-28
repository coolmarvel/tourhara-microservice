import { Controller } from '@nestjs/common';
import { ProductProductionService } from '../services/product-production.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateProductReqDto, DeleteProductReqDto, PageReqDto, RetrieveProductReqDto, UpdateProductReqDto } from '../dtos/req.dto';

@Controller()
export class ProductProductionController {
  constructor(private readonly productProductionService: ProductProductionService) {}

  @MessagePattern({ cmd: 'createAProduct_woocommerce_production' })
  async createAProduct(data: CreateProductReqDto) {
    return await this.productProductionService.createAProduct(data);
  }

  @MessagePattern({ cmd: 'retrieveAProduct_woocommerce_production' })
  async retrieveAProduct({ product_id }: RetrieveProductReqDto) {
    return await this.productProductionService.retrieveAProduct(product_id);
  }

  @MessagePattern({ cmd: 'listAllProducts_woocommerce_production' })
  async listAllProducts({ page, size }: PageReqDto) {
    return await this.productProductionService.listAllProducts(page, size);
  }

  @MessagePattern({ cmd: 'updateAProduct_woocommerce_production' })
  async updateAProduct({ product_id, data }: UpdateProductReqDto) {
    return await this.productProductionService.updateAProduct(product_id, data);
  }

  @MessagePattern({ cmd: 'deleteAProduct_woocommerce_production' })
  async deleteAProduct({ product_id }: DeleteProductReqDto) {
    return await this.productProductionService.deleteAProduct(product_id);
  }

  @MessagePattern({ cmd: 'synchronizeProduct_woocommerce_production' })
  async synchronizeProduct() {
    return await this.productProductionService.synchronizeProduct();
  }
}
