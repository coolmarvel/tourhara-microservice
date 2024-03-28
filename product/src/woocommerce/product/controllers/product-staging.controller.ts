import { Controller } from '@nestjs/common';
import { ProductStagingService } from '../services/product-staging.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateProductReqDto, DeleteProductReqDto, PageReqDto, RetrieveProductReqDto, UpdateProductReqDto } from '../dtos/req.dto';

@Controller()
export class ProductStagingController {
  constructor(private readonly productStagingService: ProductStagingService) {}

  @MessagePattern({ cmd: 'createAProduct_woocommerce_staging' })
  async createAProduct(data: CreateProductReqDto) {
    return await this.productStagingService.createAProduct(data);
  }

  @MessagePattern({ cmd: 'retrieveAProduct_woocommerce_staging' })
  async retrieveAProduct({ product_id }: RetrieveProductReqDto) {
    return await this.productStagingService.retrieveAProduct(product_id);
  }

  @MessagePattern({ cmd: 'listAllProducts_woocommerce_staging' })
  async listAllProducts({ page, size }: PageReqDto) {
    return await this.productStagingService.listAllProducts(page, size);
  }

  @MessagePattern({ cmd: 'updateAProduct_woocommerce_staging' })
  async updateAProduct({ product_id, data }: UpdateProductReqDto) {
    return await this.productStagingService.updateAProduct(product_id, data);
  }

  @MessagePattern({ cmd: 'deleteAProduct_woocommerce_staging' })
  async deleteAProduct({ product_id }: DeleteProductReqDto) {
    return await this.productStagingService.deleteAProduct(product_id);
  }

  @MessagePattern({ cmd: 'synchronizeProductByWooCommerce_staging' })
  async synchronizeProductByWooCommerce() {
    return await this.productStagingService.synchronizeProductByWooCommerce();
  }
}
