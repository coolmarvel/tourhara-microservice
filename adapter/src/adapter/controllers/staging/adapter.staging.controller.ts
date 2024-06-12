import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AdapterStagingService } from 'src/adapter/services/staging/adapter.staging.service';

@Controller()
export class AdapterStagingController {
  constructor(private readonly adapterService: AdapterStagingService) {}

  @MessagePattern({ cmd: 'getAllTypes_staging' })
  async getAllTypes() {
    return this.adapterService.getAllTypes();
  }

  @MessagePattern({ cmd: 'getAllNotDeclaredCategories_staging' })
  async getAllNotDeclaredCategories() {
    return this.adapterService.getAllNotDeclaredCategories();
  }

  @MessagePattern({ cmd: 'getAllDeclaredCategories_staging' })
  async getAllDeclaredCategories({ type_id }: { type_id: number }) {
    return this.adapterService.getAllDeclaredCategories(type_id);
  }

  @MessagePattern({ cmd: 'updateCategoryByType_staging' })
  async updateCategoryByType({ type_id, category_id }: { type_id: number; category_id: number }) {
    return this.adapterService.updateCategoryByType(type_id, category_id);
  }

  @MessagePattern({ cmd: 'getOrdersByProductId_staging' })
  getOrdersByProductId({ product_id, after, before }: { product_id: string; after: string; before: string }) {
    return this.adapterService.getOrdersByProductId(product_id, after, before);
  }

  @MessagePattern({ cmd: 'getOrderByProductIdAndOrderId_staging' })
  getOrderByProductIdAndOrderId({ product_id, order_id }: { product_id: string; order_id: string }) {
    return this.adapterService.getOrderByProductIdAndOrderId(product_id, order_id);
  }
}
