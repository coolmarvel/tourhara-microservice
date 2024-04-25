import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AdapterStagingService } from 'src/adapter/services/staging/adapter.staging.service';

@Controller()
export class AdapterStagingController {
  constructor(private readonly adapterService: AdapterStagingService) {}

  @MessagePattern({ cmd: 'getAllProductTypes_staging' })
  async getAllProductTypes() {
    return await this.adapterService.getAllProductTypes();
  }

  @MessagePattern({ cmd: 'getAllNotSpecifiedProductCategories_staging' })
  async getAllNotSpecifiedProductCategories() {
    return await this.adapterService.getAllNotSpecifiedProductCategories();
  }

  @MessagePattern({ cmd: 'getSpecifiedProductCategoryByType_staging' })
  async getSpecifiedProductCategoryByType({ product_type_id }: { product_type_id: string }) {
    return await this.adapterService.getSpecifiedProductCategoryByType(product_type_id);
  }

  @MessagePattern({ cmd: 'updateProductCategory_staging' })
  async updateProductCategory({ product_category_id, product_type_id }: { product_category_id: string; product_type_id: string }) {
    return await this.adapterService.updateProductCategory(product_category_id, product_type_id);
  }

  @MessagePattern({ cmd: 'getAllProducts_staging' })
  async getAllProducts({ product_type_id }: { product_type_id: string }) {
    return await this.adapterService.getAllProducts(product_type_id);
  }
}
