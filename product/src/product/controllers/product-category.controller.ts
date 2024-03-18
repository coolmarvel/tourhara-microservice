import { Controller, VERSION_NEUTRAL } from '@nestjs/common';
import { ProductCategoryService } from '../services/product-cateogry.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller({ path: 'product/cateogy', version: VERSION_NEUTRAL })
export class ProductCateogryController {
  constructor(private readonly productCategoryService: ProductCategoryService) {}

  // WooCommerce Staging Product Category APIs
  @MessagePattern({ cmd: 'createAProductCategory_stag' })
  async createAProductCategory_stag({ name, image }: { name: string; image: any }) {
    return await this.productCategoryService.createAProductCategory_stag(name, image);
  }

  @MessagePattern({ cmd: 'retrieveAProductCategory_stag' })
  async retrieveAProductCategory_stag({ category_id }: { category_id: string }) {
    return await this.productCategoryService.retrieveAProductCategory_stag(category_id);
  }

  @MessagePattern({ cmd: 'listAllProductCategories_stag' })
  async listAllProductCategories_stag({ page, size }: { page: number; size: number }) {
    return await this.productCategoryService.listAllProductCategories_stag(page, size);
  }

  @MessagePattern({ cmd: 'updateAProductCategory_stag' })
  async updateAProductCategory_stag({ category_id, data }: { category_id: string; data: any }) {
    return await this.productCategoryService.updateAProductCategory_stag(category_id, data);
  }

  @MessagePattern({ cmd: 'deleteAProductCategory_stag' })
  async deleteAProductCategory_stag({ category_id }: { category_id: string }) {
    return await this.productCategoryService.deleteAProductCategory_stag(category_id);
  }

  // WooCommerce Production Product Category APIs
  @MessagePattern({ cmd: 'createAProductCategory_prod' })
  async createAProductCategory_prod({ name, image }: { name: string; image: any }) {
    return await this.productCategoryService.createAProductCategory_prod(name, image);
  }

  @MessagePattern({ cmd: 'retrieveAProductCategory_prod' })
  async retrieveAProductCategory_prod({ category_id }: { category_id: string }) {
    return await this.productCategoryService.retrieveAProductCategory_prod(category_id);
  }

  @MessagePattern({ cmd: 'listAllProductCategories_prod' })
  async listAllProductCategories_prod({ page, size }: { page: number; size: number }) {
    return await this.productCategoryService.listAllProductCategories_prod(page, size);
  }

  @MessagePattern({ cmd: 'updateAProductCategory_prod' })
  async updateAProductCategory_prod({ category_id, data }: { category_id: string; data: any }) {
    return await this.productCategoryService.updateAProductCategory_prod(category_id, data);
  }

  @MessagePattern({ cmd: 'deleteAProductCategory_prod' })
  async deleteAProductCategory_prod({ category_id }: { category_id: string }) {
    return await this.productCategoryService.deleteAProductCategory_prod(category_id);
  }

  // Database Insert
  @MessagePattern({ cmd: 'insertProductCategories_prod' })
  async insertProductCategories_prod() {
    return await this.productCategoryService.insertProductCategories_prod();
  }
}
