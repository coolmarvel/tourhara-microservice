import { Controller } from '@nestjs/common';
import { CategoryStagingService } from '../services/category-staging.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class CategoryStagingController {
  constructor(private readonly categoryStagingService: CategoryStagingService) {}

  @MessagePattern({ cmd: 'createAProductCategory_woocommerce_staging' })
  async createAProductCategory(data: any): Promise<any> {
    return await this.categoryStagingService.createAProductCategory(data);
  }

  @MessagePattern({ cmd: 'retrieveAProductCategory_woocommerce_staging' })
  async retrieveAProductCategory({ attribute_id }: { attribute_id: number }): Promise<any> {
    return await this.categoryStagingService.retrieveAProductCategory(attribute_id);
  }

  @MessagePattern({ cmd: 'listAllProductCategories_woocommerce_staging' })
  async listAllProductCategories({ page, size }: { page: number; size: number }): Promise<any> {
    return await this.categoryStagingService.listAllProductCategories(page, size);
  }

  @MessagePattern({ cmd: 'updateAProductCategory_woocommerce_staging' })
  async updateAProductCategory({ attribute_id, data }: { attribute_id: number; data: any }): Promise<any> {
    return await this.categoryStagingService.updateAProductCategory(attribute_id, data);
  }

  @MessagePattern({ cmd: 'deleteAProductCategory_woocommerce_staging' })
  async deleteAProductCategory({ attribute_id }: { attribute_id: number }): Promise<any> {
    return await this.categoryStagingService.deleteAProductCategory(attribute_id);
  }
}
