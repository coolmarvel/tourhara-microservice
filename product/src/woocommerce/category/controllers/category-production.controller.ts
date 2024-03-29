import { Controller } from '@nestjs/common';
import { CategoryProductionService } from '../services/category-production.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class CategoryProductionController {
  constructor(private readonly categoryProductionService: CategoryProductionService) {}

  @MessagePattern({ cmd: 'createAProductCategory_woocommerce_production' })
  async createAProductCategory(data: any): Promise<any> {
    return await this.categoryProductionService.createAProductCategory(data);
  }

  @MessagePattern({ cmd: 'retrieveAProductCategory_woocommerce_production' })
  async retrieveAProductCategory({ category_id }: { category_id: number }): Promise<any> {
    return await this.categoryProductionService.retrieveAProductCategory(category_id);
  }

  @MessagePattern({ cmd: 'listAllProductCategories_woocommerce_production' })
  async listAllProductCategories({ page, size }: { page: number; size: number }): Promise<any> {
    return await this.categoryProductionService.listAllProductCategories(page, size);
  }

  @MessagePattern({ cmd: 'updateAProductCategory_woocommerce_production' })
  async updateAProductCategory({ category_id, data }: { category_id: number; data: any }): Promise<any> {
    return await this.categoryProductionService.updateAProductCategory(category_id, data);
  }

  @MessagePattern({ cmd: 'deleteAProductCategory_woocommerce_production' })
  async deleteAProductCategory({ category_id }: { category_id: number }): Promise<any> {
    return await this.categoryProductionService.deleteAProductCategory(category_id);
  }
}
