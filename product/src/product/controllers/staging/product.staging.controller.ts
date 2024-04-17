import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProductStagingService } from 'src/product/services/staging/product.staging.service';
import { CreateProductReqDto, DeleteProductReqDto, PageReqDto, RetrieveProductReqDto, UpdateProductReqDto } from 'src/product/dtos/req.dto';

@Controller()
export class ProductStagingController {
  constructor(private readonly productService: ProductStagingService) {}

  @MessagePattern({ cmd: 'createAProduct_staging' })
  async createAProduct(data: CreateProductReqDto) {
    return await this.productService.createAProduct(data);
  }

  @MessagePattern({ cmd: 'retrieveAProduct_staging' })
  async retrieveAProduct({ product_id }: RetrieveProductReqDto) {
    return await this.productService.retrieveAProduct(product_id);
  }

  @MessagePattern({ cmd: 'listAllProducts_staging' })
  async listAllProducts({ page, size }: PageReqDto) {
    return await this.productService.listAllProducts(page, size);
  }

  @MessagePattern({ cmd: 'updateAProduct_staging' })
  async updateAProduct({ product_id, data }: UpdateProductReqDto) {
    return await this.productService.updateAProduct(product_id, data);
  }

  @MessagePattern({ cmd: 'deleteAProduct_staging' })
  async deleteAProduct({ product_id }: DeleteProductReqDto) {
    return await this.productService.deleteAProduct(product_id);
  }

  /**
   * Webhook
   */
  @MessagePattern({ cmd: 'productCreated_staging' })
  async productCreated(payload: any) {
    return await this.productService.productCreated(payload);
  }

  @MessagePattern({ cmd: 'productUpdated_staging' })
  async productUpdated(payload: any) {
    return await this.productService.productUpdated(payload);
  }

  @MessagePattern({ cmd: 'productDeleted_staging' })
  async productDeleted(payload: any) {
    return await this.productService.productDeleted(payload);
  }

  @MessagePattern({ cmd: 'productRestored_staging' })
  async productRestored(payload: any) {
    return await this.productService.productRestored(payload);
  }
}
