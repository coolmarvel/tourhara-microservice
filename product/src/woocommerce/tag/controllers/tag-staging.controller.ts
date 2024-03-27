import { Controller } from '@nestjs/common';
import { TagStagingService } from '../services/tag-staging.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class TagStagingController {
  constructor(private readonly tagStagingService: TagStagingService) {}

  @MessagePattern({ cmd: 'createAProductTag_woocommerce_staging' })
  async createAProductTag(data: any): Promise<any> {
    return await this.tagStagingService.createAProductTag(data);
  }

  @MessagePattern({ cmd: 'retrieveAProductTag_woocommerce_staging' })
  async retrieveAProductTag({ attribute_id }: { attribute_id: number }): Promise<any> {
    return await this.tagStagingService.retrieveAProductTag(attribute_id);
  }

  @MessagePattern({ cmd: 'listAllProductTags_woocommerce_staging' })
  async listAllProductTags({ page, size }: { page: number; size: number }): Promise<any> {
    return await this.tagStagingService.listAllProductTags(page, size);
  }

  @MessagePattern({ cmd: 'updateAProductTag_woocommerce_staging' })
  async updateAProductTag({ attribute_id, data }: { attribute_id: number; data: any }): Promise<any> {
    return await this.tagStagingService.updateAProductTag(attribute_id, data);
  }

  @MessagePattern({ cmd: 'deleteAProductTag_woocommerce_staging' })
  async deleteAProductTag({ attribute_id }: { attribute_id: number }): Promise<any> {
    return await this.tagStagingService.deleteAProductTag(attribute_id);
  }
}
