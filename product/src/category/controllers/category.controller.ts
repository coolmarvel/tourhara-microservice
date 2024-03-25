import { Controller, VERSION_NEUTRAL } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller({ path: 'product/category', version: VERSION_NEUTRAL })
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // WooCommerce Staging Product Category APIs
  @MessagePattern({ cmd: 'createAProductCategory_stag' })
  async createAProductCategory_stag(data) {
    return await this.categoryService.createAProductCategory_stag(data);
  }

  @MessagePattern({ cmd: 'retrieveAProductCategory_stag' })
  async retrieveAProductCategory_stag({ category_id }: { category_id: string }) {
    return await this.categoryService.retrieveAProductCategory_stag(category_id);
  }

  @MessagePattern({ cmd: 'listAllProductCategories_stag' })
  async listAllProductCategories_stag({ page, size }: { page: number; size: number }) {
    return await this.categoryService.listAllProductCategories_stag(page, size);
  }

  @MessagePattern({ cmd: 'updateAProductCategory_stag' })
  async updateAProductCategory_stag({ category_id, data }: { category_id: string; data: any }) {
    return await this.categoryService.updateAProductCategory_stag(category_id, data);
  }

  @MessagePattern({ cmd: 'deleteAProductCategory_stag' })
  async deleteAProductCategory_stag({ category_id }: { category_id: string }) {
    return await this.categoryService.deleteAProductCategory_stag(category_id);
  }

  // WooCommerce Production Product Category APIs
  @MessagePattern({ cmd: 'createAProductCategory_prod' })
  async createAProductCategory_prod(data) {
    return await this.categoryService.createAProductCategory_prod(data);
  }

  @MessagePattern({ cmd: 'retrieveAProductCategory_prod' })
  async retrieveAProductCategory_prod({ category_id }: { category_id: string }) {
    return await this.categoryService.retrieveAProductCategory_prod(category_id);
  }

  @MessagePattern({ cmd: 'listAllProductCategories_prod' })
  async listAllProductCategories_prod({ page, size }: { page: number; size: number }) {
    return await this.categoryService.listAllProductCategories_prod(page, size);
  }

  @MessagePattern({ cmd: 'updateAProductCategory_prod' })
  async updateAProductCategory_prod({ category_id, data }: { category_id: string; data: any }) {
    return await this.categoryService.updateAProductCategory_prod(category_id, data);
  }

  @MessagePattern({ cmd: 'deleteAProductCategory_prod' })
  async deleteAProductCategory_prod({ category_id }: { category_id: string }) {
    return await this.categoryService.deleteAProductCategory_prod(category_id);
  }
}
