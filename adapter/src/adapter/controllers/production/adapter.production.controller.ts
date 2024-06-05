import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AdapterProductionService } from 'src/adapter/services/production/adapter.production.service';

@Controller()
export class AdapterProductionController {
  constructor(private readonly adapterService: AdapterProductionService) {}

  @MessagePattern({ cmd: 'getAllTypes_production' })
  async getAllTypes() {
    return await this.adapterService.getAllTypes();
  }

  @MessagePattern({ cmd: 'getAllNotDeclaredCategories_production' })
  async getAllNotDeclaredCategories() {
    return await this.adapterService.getAllNotDeclaredCategories();
  }

  @MessagePattern({ cmd: 'getAllDeclaredCategories_production' })
  async getAllDeclaredCategories({ type_id }: { type_id: number }) {
    return await this.adapterService.getAllDeclaredCategories(type_id);
  }

  @MessagePattern({ cmd: 'updateCategoryByType_production' })
  async updateCategoryByType({ type_id, category_id }: { type_id: number; category_id: number }) {
    return await this.adapterService.updateCategoryByType(type_id, category_id);
  }

  @MessagePattern({ cmd: 'getAdaptedOrders_production' })
  async getAdaptedOrders({ type_id, category_id, start_date, end_date }: { type_id: number; category_id: number; start_date: string; end_date: string }) {
    return await this.adapterService.getAdaptedOrders(type_id, category_id, start_date, end_date);
  }

  @MessagePattern({ cmd: 'getOrdersByProductName_production' })
  async getOrdersByProductName({ product_name, start_date, end_date }: { product_name: string; start_date: string; end_date: string }) {
    return await this.adapterService.getOrdersByProductName(product_name, start_date, end_date);
  }

  @MessagePattern({ cmd: 'getOrdersByCategory_production' })
  getOrdersByCategory({ category_id, after, before }: { category_id: number; after: string; before: string }) {
    return this.adapterService.getOrdersByCategory(category_id, after, before);
  }
}
