import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { RestApiService } from '../services';
import { CreateProductReqDto, DeleteProductReqDto, PageReqDto, RetrieveProductReqDto, UpdateProductReqDto } from '../dtos';

@Controller()
export default class RestApiController {
  constructor(private readonly restApiService: RestApiService) {}

  @MessagePattern({ cmd: 'createAProductAttribute' })
  async createAProductAttribute(data: any): Promise<any> {
    return await this.restApiService.createAProductAttribute(data);
  }

  @MessagePattern({ cmd: 'retrieveAProductAttribute' })
  async retrieveAProductAttribute({ attribute_id }: { attribute_id: number }): Promise<any> {
    return await this.restApiService.retrieveAProductAttribute(attribute_id);
  }

  @MessagePattern({ cmd: 'listAllProductAttributes' })
  async listAllProductAttributes({ page, size }: { page: number; size: number }): Promise<any> {
    return await this.restApiService.listAllProductAttributes(page, size);
  }

  @MessagePattern({ cmd: 'updateAProductAttribute' })
  async updateAProductAttribute({ attribute_id, data }: { attribute_id: number; data: any }): Promise<any> {
    return await this.restApiService.updateAProductAttribute(attribute_id, data);
  }

  @MessagePattern({ cmd: 'deleteAProductAttribute' })
  async deleteAProductAttribute({ attribute_id }: { attribute_id: number }): Promise<any> {
    return await this.restApiService.deleteAProductAttribute(attribute_id);
  }

  @MessagePattern({ cmd: 'createAProductCategory' })
  async createAProductCategory(data: any): Promise<any> {
    return await this.restApiService.createAProductCategory(data);
  }

  @MessagePattern({ cmd: 'retrieveAProductCategory' })
  async retrieveAProductCategory({ category_id }: { category_id: number }): Promise<any> {
    return await this.restApiService.retrieveAProductCategory(category_id);
  }

  @MessagePattern({ cmd: 'listAllProductCategories' })
  async listAllProductCategories({ page, size }: { page: number; size: number }): Promise<any> {
    return await this.restApiService.listAllProductCategories(page, size);
  }

  @MessagePattern({ cmd: 'updateAProductCategory' })
  async updateAProductCategory({ category_id, data }: { category_id: number; data: any }): Promise<any> {
    return await this.restApiService.updateAProductCategory(category_id, data);
  }

  @MessagePattern({ cmd: 'deleteAProductCategory' })
  async deleteAProductCategory({ category_id }: { category_id: number }): Promise<any> {
    return await this.restApiService.deleteAProductCategory(category_id);
  }

  @MessagePattern({ cmd: 'createAProduct' })
  async createAProduct(data: CreateProductReqDto) {
    return await this.restApiService.createAProduct(data);
  }

  @MessagePattern({ cmd: 'retrieveAProduct' })
  async retrieveAProduct({ product_id }: RetrieveProductReqDto) {
    return await this.restApiService.retrieveAProduct(product_id);
  }

  @MessagePattern({ cmd: 'listAllProducts' })
  async listAllProducts({ page, size }: PageReqDto) {
    return await this.restApiService.listAllProducts(page, size);
  }

  @MessagePattern({ cmd: 'updateAProduct' })
  async updateAProduct({ product_id, data }: UpdateProductReqDto) {
    return await this.restApiService.updateAProduct(product_id, data);
  }

  @MessagePattern({ cmd: 'deleteAProduct' })
  async deleteAProduct({ product_id }: DeleteProductReqDto) {
    return await this.restApiService.deleteAProduct(product_id);
  }

  @MessagePattern({ cmd: 'createAProductTag' })
  async createAProductTag(data: any): Promise<any> {
    return await this.restApiService.createAProductTag(data);
  }

  @MessagePattern({ cmd: 'retrieveAProductTag' })
  async retrieveAProductTag({ tag_id }: { tag_id: number }): Promise<any> {
    return await this.restApiService.retrieveAProductTag(tag_id);
  }

  @MessagePattern({ cmd: 'listAllProductTags' })
  async listAllProductTags({ page, size }: { page: number; size: number }): Promise<any> {
    return await this.restApiService.listAllProductTags(page, size);
  }

  @MessagePattern({ cmd: 'updateAProductTag' })
  async updateAProductTag({ tag_id, data }: { tag_id: number; data: any }): Promise<any> {
    return await this.restApiService.updateAProductTag(tag_id, data);
  }

  @MessagePattern({ cmd: 'deleteAProductTag' })
  async deleteAProductTag({ tag_id }: { tag_id: number }): Promise<any> {
    return await this.restApiService.deleteAProductTag(tag_id);
  }
}
