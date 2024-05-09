import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AdapterStagingService } from 'src/adapter/services/staging/adapter.staging.service';

@Controller()
export class AdapterStagingController {
  constructor(private readonly adapterService: AdapterStagingService) {}

  @MessagePattern({ cmd: 'getAllTypes_staging' })
  async getAllTypes() {
    return await this.adapterService.getAllTypes();
  }

  @MessagePattern({ cmd: 'getAllNotDeclaredCategories_staging' })
  async getAllNotDeclaredCategories() {
    return await this.adapterService.getAllNotDeclaredCategories();
  }

  @MessagePattern({ cmd: 'getAllDeclaredCategories_staging' })
  async getAllDeclaredCategories({ type_id }: { type_id: number }) {
    return await this.adapterService.getAllDeclaredCategories(type_id);
  }

  @MessagePattern({ cmd: 'updateCategoryByType_staging' })
  async updateCategoryByType({ type_id, category_id }: { type_id: number; category_id: number }) {
    return await this.adapterService.updateCategoryByType(type_id, type_id);
  }

  @MessagePattern({ cmd: 'getAdaptedOrders_staging' })
  async getAdaptedOrders({ type_id, category_id, page, size }: { type_id: number; category_id: number; page: number; size: number }) {
    return await this.adapterService.getAdaptedOrders(type_id, category_id, page, size);
  }
}
