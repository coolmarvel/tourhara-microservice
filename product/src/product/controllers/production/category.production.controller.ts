import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CategoryProductionService } from 'src/product/services/production/category.production.service';

@Controller()
export class CategoryProductionController {
  constructor(private readonly categoryService: CategoryProductionService) {}

  @MessagePattern({ cmd: 'createAProductCategory_production' })
  async createAProductCategory(data: any): Promise<any> {
    return await this.categoryService.createAProductCategory(data);
  }

  @MessagePattern({ cmd: 'retrieveAProductCategory_production' })
  async retrieveAProductCategory({ category_id }: { category_id: number }): Promise<any> {
    return await this.categoryService.retrieveAProductCategory(category_id);
  }

  @MessagePattern({ cmd: 'listAllProductCategories_production' })
  async listAllProductCategories({ page, size }: { page: number; size: number }): Promise<any> {
    return await this.categoryService.listAllProductCategories(page, size);
  }

  @MessagePattern({ cmd: 'updateAProductCategory_production' })
  async updateAProductCategory({ category_id, data }: { category_id: number; data: any }): Promise<any> {
    return await this.categoryService.updateAProductCategory(category_id, data);
  }

  @MessagePattern({ cmd: 'deleteAProductCategory_production' })
  async deleteAProductCategory({ category_id }: { category_id: number }): Promise<any> {
    return await this.categoryService.deleteAProductCategory(category_id);
  }
}
