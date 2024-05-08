import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AdapterStagingService } from 'src/adapter/services/staging/adapter.staging.service';

@Controller()
export class AdapterStagingController {
  constructor(private readonly adapterService: AdapterStagingService) {}

  @MessagePattern({ cmd: 'getAllProductTypes_staging' })
  async getAllProductTypes() {
    return await this.adapterService.getAllProductTypes();
  }

  @MessagePattern({ cmd: 'getAllNotSpecifiedProductCategories_staging' })
  async getAllNotSpecifiedProductCategories() {
    return await this.adapterService.getAllNotSpecifiedProductCategories();
  }

  @MessagePattern({ cmd: 'getSpecifiedProductCategoryByType_staging' })
  async getSpecifiedProductCategoryByType({ type_id }: { type_id: number }) {
    return await this.adapterService.getSpecifiedProductCategoryByType(type_id);
  }

  @MessagePattern({ cmd: 'updateProductCategory_staging' })
  async updateProductCategory({ type_id, category_id }: { type_id: number; category_id: number }) {
    return await this.adapterService.updateProductCategory(type_id, type_id);
  }

  @MessagePattern({ cmd: 'getAllProducts_staging' })
  async getAllProducts({ type_id }: { type_id: number }) {
    return await this.adapterService.getAllProducts(type_id);
  }

  @MessagePattern({ cmd: 'getOrdersByTypeId_staging' })
  async getOrdersByTypeId({ type_id, category_id, page, size }: { type_id: number; category_id: number; page: number; size: number }) {
    return await this.adapterService.getOrdersByTypeId(type_id, category_id, page, size);
  }
}
