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
  async getAdaptedOrders({ type_id, category_id, page, size }: { type_id: number; category_id: number; page: number; size: number }) {
    return await this.adapterService.getAdaptedOrders(type_id, category_id, page, size);
  }
}
