import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TagProductionService } from 'src/product/services/production/tag.production.service';

@Controller()
export class TagProductionController {
  constructor(private readonly tagService: TagProductionService) {}

  @MessagePattern({ cmd: 'createAProductTag_production' })
  async createAProductTag(data: any): Promise<any> {
    return await this.tagService.createAProductTag(data);
  }

  @MessagePattern({ cmd: 'retrieveAProductTag_production' })
  async retrieveAProductTag({ tag_id }: { tag_id: number }): Promise<any> {
    return await this.tagService.retrieveAProductTag(tag_id);
  }

  @MessagePattern({ cmd: 'listAllProductTags_production' })
  async listAllProductTags({ page, size }: { page: number; size: number }): Promise<any> {
    return await this.tagService.listAllProductTags(page, size);
  }

  @MessagePattern({ cmd: 'updateAProductTag_production' })
  async updateAProductTag({ tag_id, data }: { tag_id: number; data: any }): Promise<any> {
    return await this.tagService.updateAProductTag(tag_id, data);
  }

  @MessagePattern({ cmd: 'deleteAProductTag_production' })
  async deleteAProductTag({ tag_id }: { tag_id: number }): Promise<any> {
    return await this.tagService.deleteAProductTag(tag_id);
  }
}
