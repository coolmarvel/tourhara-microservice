import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CategoryStagingService } from 'src/product/services/staging/category.staging.service';

@Controller()
export class CategoryStagingController {
  constructor(private readonly categoryService: CategoryStagingService) {}

  @MessagePattern({ cmd: 'createAProductCategory_staging' })
  async createAProductCategory(data: any): Promise<any> {
    return await this.categoryService.createAProductCategory(data);
  }

  @MessagePattern({ cmd: 'retrieveAProductCategory_staging' })
  async retrieveAProductCategory({ category_id }: { category_id: number }): Promise<any> {
    return await this.categoryService.retrieveAProductCategory(category_id);
  }

  @MessagePattern({ cmd: 'listAllProductCategories_staging' })
  async listAllProductCategories({ page, size }: { page: number; size: number }): Promise<any> {
    return await this.categoryService.listAllProductCategories(page, size);
  }

  @MessagePattern({ cmd: 'updateAProductCategory_staging' })
  async updateAProductCategory({ category_id, data }: { category_id: number; data: any }): Promise<any> {
    return await this.categoryService.updateAProductCategory(category_id, data);
  }

  @MessagePattern({ cmd: 'deleteAProductCategory_staging' })
  async deleteAProductCategory({ category_id }: { category_id: number }): Promise<any> {
    return await this.categoryService.deleteAProductCategory(category_id);
  }
}
