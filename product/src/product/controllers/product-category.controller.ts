import { Controller, VERSION_NEUTRAL } from '@nestjs/common';
import { ProductCategoryService } from '../services/product-cateogry.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller({ path: 'product/cateogy', version: VERSION_NEUTRAL })
export class ProductCateogryController {
  constructor(private readonly productCategoryService: ProductCategoryService) {}

  // WooCommerce Staging Product Category APIs
  @MessagePattern({ cmd: 'createProductCategory_stag' })
  async createProductCategory_stag({ name, image }: { name: string; image: any }) {
    return await this.productCategoryService.createProductCategory_stag(name, image);
  }

  @MessagePattern({ cmd: 'retrieveProductCategory_stag' })
  async retrieveProductCategory_stag({ category_id }: { category_id: string }) {
    return await this.productCategoryService.retrieveProductCategory_stag(category_id);
  }

  @MessagePattern({ cmd: 'listAllProductCategories_stag' })
  async listAllProductCategories_stag({ page, size }: { page: number; size: number }) {
    return await this.productCategoryService.listAllProductCategories_stag(page, size);
  }

  @MessagePattern({ cmd: 'updateProductCategory_stag' })
  async updateProductCategory_stag({ category_id, data }: { category_id: string; data: any }) {
    return await this.productCategoryService.updateProductCategory_stag(category_id, data);
  }

  @MessagePattern({ cmd: 'deleteProductCategory_stag' })
  async deleteProductCategory_stag({ category_id }: { category_id: string }) {
    return await this.productCategoryService.deleteProductCategory_stag(category_id);
  }

  // WooCommerce Production Product Category APIs
  @MessagePattern({ cmd: 'createProductCategory_prod' })
  async createProductCategory_prod({ name, image }: { name: string; image: any }) {
    return await this.productCategoryService.createProductCategory_prod(name, image);
  }

  @MessagePattern({ cmd: 'retrieveProductCategory_prod' })
  async retrieveProductCategory_prod({ category_id }: { category_id: string }) {
    return await this.productCategoryService.retrieveProductCategory_prod(category_id);
  }

  @MessagePattern({ cmd: 'listAllProductCategories_prod' })
  async listAllProductCategories_prod({ page, size }: { page: number; size: number }) {
    return await this.productCategoryService.listAllProductCategories_prod(page, size);
  }

  @MessagePattern({ cmd: 'updateProductCategory_prod' })
  async updateProductCategory_prod({ category_id, data }: { category_id: string; data: any }) {
    return await this.productCategoryService.updateProductCategory_prod(category_id, data);
  }

  @MessagePattern({ cmd: 'deleteProductCategory_prod' })
  async deleteProductCategory_prod({ category_id }: { category_id: string }) {
    return await this.productCategoryService.deleteProductCategory_prod(category_id);
  }
}
