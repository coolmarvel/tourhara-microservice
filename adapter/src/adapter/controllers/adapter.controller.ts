import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { AdapterService } from '../services/adapter.service';

@Controller()
export class AdapterController {
  constructor(private readonly adapterService: AdapterService) {}

  @MessagePattern({ cmd: 'getAllTypes' })
  async getAllTypes() {
    return await this.adapterService.getAllTypes();
  }

  @MessagePattern({ cmd: 'getAllNotDeclaredCategories' })
  async getAllNotDeclaredCategories() {
    return await this.adapterService.getAllNotDeclaredCategories();
  }

  @MessagePattern({ cmd: 'getAllDeclaredCategories' })
  async getAllDeclaredCategories({ type_id }: { type_id: number }) {
    return await this.adapterService.getAllDeclaredCategories(type_id);
  }

  @MessagePattern({ cmd: 'updateCategoryByType' })
  async updateCategoryByType({ type_id, category_id }: { type_id: number; category_id: number }) {
    return await this.adapterService.updateCategoryByType(type_id, category_id);
  }

  @MessagePattern({ cmd: 'getOrdersByProductId' })
  async getOrdersByProductId({ product_id, after, before }: { product_id: string; after: string; before: string }) {
    return await this.adapterService.getOrdersByProductId(product_id, after, before);
  }

  @MessagePattern({ cmd: 'getOrderByProductIdAndOrderId' })
  async getOrderByProductIdAndOrderId({ product_id, order_id }: { product_id: string; order_id: string }) {
    return await this.adapterService.getOrderByProductIdAndOrderId(product_id, order_id);
  }
}
