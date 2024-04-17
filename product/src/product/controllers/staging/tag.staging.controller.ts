import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TagStagingService } from 'src/product/services/staging/tag.staging.service';

@Controller()
export class TagStagingController {
  constructor(private readonly tagService: TagStagingService) {}

  @MessagePattern({ cmd: 'createAProductTag_staging' })
  async createAProductTag(data: any): Promise<any> {
    return await this.tagService.createAProductTag(data);
  }

  @MessagePattern({ cmd: 'retrieveAProductTag_staging' })
  async retrieveAProductTag({ tag_id }: { tag_id: number }): Promise<any> {
    return await this.tagService.retrieveAProductTag(tag_id);
  }

  @MessagePattern({ cmd: 'listAllProductTags_staging' })
  async listAllProductTags({ page, size }: { page: number; size: number }): Promise<any> {
    return await this.tagService.listAllProductTags(page, size);
  }

  @MessagePattern({ cmd: 'updateAProductTag_staging' })
  async updateAProductTag({ tag_id, data }: { tag_id: number; data: any }): Promise<any> {
    return await this.tagService.updateAProductTag(tag_id, data);
  }

  @MessagePattern({ cmd: 'deleteAProductTag_staging' })
  async deleteAProductTag({ tag_id }: { tag_id: number }): Promise<any> {
    return await this.tagService.deleteAProductTag(tag_id);
  }
}
