import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { CategoryService } from '../services/category.service';

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @MessagePattern({ cmd: 'createAProductCategory' })
  async createAProductCategory(data: any): Promise<any> {
    return await this.categoryService.createAProductCategory(data);
  }

  @MessagePattern({ cmd: 'retrieveAProductCategory' })
  async retrieveAProductCategory({ category_id }: { category_id: number }): Promise<any> {
    return await this.categoryService.retrieveAProductCategory(category_id);
  }

  @MessagePattern({ cmd: 'listAllProductCategories' })
  async listAllProductCategories({ page, size }: { page: number; size: number }): Promise<any> {
    return await this.categoryService.listAllProductCategories(page, size);
  }

  @MessagePattern({ cmd: 'updateAProductCategory' })
  async updateAProductCategory({ category_id, data }: { category_id: number; data: any }): Promise<any> {
    return await this.categoryService.updateAProductCategory(category_id, data);
  }

  @MessagePattern({ cmd: 'deleteAProductCategory' })
  async deleteAProductCategory({ category_id }: { category_id: number }): Promise<any> {
    return await this.categoryService.deleteAProductCategory(category_id);
  }
}
