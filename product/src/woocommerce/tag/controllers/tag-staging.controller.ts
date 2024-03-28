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
  async retrieveAProductTag({ tag_id }: { tag_id: number }): Promise<any> {
    return await this.tagStagingService.retrieveAProductTag(tag_id);
  }

  @MessagePattern({ cmd: 'listAllProductTags_woocommerce_staging' })
  async listAllProductTags({ page, size }: { page: number; size: number }): Promise<any> {
    return await this.tagStagingService.listAllProductTags(page, size);
  }

  @MessagePattern({ cmd: 'updateAProductTag_woocommerce_staging' })
  async updateAProductTag({ tag_id, data }: { tag_id: number; data: any }): Promise<any> {
    return await this.tagStagingService.updateAProductTag(tag_id, data);
  }

  @MessagePattern({ cmd: 'deleteAProductTag_woocommerce_staging' })
  async deleteAProductTag({ tag_id }: { tag_id: number }): Promise<any> {
    return await this.tagStagingService.deleteAProductTag(tag_id);
  }
}
