import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AdapterProductionService } from 'src/adapter/services/production/adapter.production.service';

@Controller()
export class AdapterProductionController {
  constructor(private readonly adapterService: AdapterProductionService) {}

  @MessagePattern({ cmd: 'getAllTypes_production' })
  async getAllTypes() {
    return this.adapterService.getAllTypes();
  }

  @MessagePattern({ cmd: 'getAllNotDeclaredCategories_production' })
  async getAllNotDeclaredCategories() {
    return this.adapterService.getAllNotDeclaredCategories();
  }

  @MessagePattern({ cmd: 'getAllDeclaredCategories_production' })
  async getAllDeclaredCategories({ type_id }: { type_id: number }) {
    return this.adapterService.getAllDeclaredCategories(type_id);
  }

  @MessagePattern({ cmd: 'updateCategoryByType_production' })
  async updateCategoryByType({ type_id, category_id }: { type_id: number; category_id: number }) {
    return this.adapterService.updateCategoryByType(type_id, category_id);
  }

  @MessagePattern({ cmd: 'getOrdersByProductId_production' })
  getOrdersByProductId({ product_id, after, before }: { product_id: string; after: string; before: string }) {
    return this.adapterService.getOrdersByProductId(product_id, after, before);
  }

  @MessagePattern({ cmd: 'getOrderByProductIdAndOrderId_production' })
  getOrderByProductIdAndOrderId({ product_id, order_id }: { product_id: string; order_id: string }) {
    return this.adapterService.getOrderByProductIdAndOrderId(product_id, order_id);
  }
}
