import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { TagService } from '../services/tag.service';

@Controller()
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @MessagePattern({ cmd: 'createAProductTag' })
  async createAProductTag(data: any): Promise<any> {
    return await this.tagService.createAProductTag(data);
  }

  @MessagePattern({ cmd: 'retrieveAProductTag' })
  async retrieveAProductTag({ tag_id }: { tag_id: number }): Promise<any> {
    return await this.tagService.retrieveAProductTag(tag_id);
  }

  @MessagePattern({ cmd: 'listAllProductTags' })
  async listAllProductTags({ page, size }: { page: number; size: number }): Promise<any> {
    return await this.tagService.listAllProductTags(page, size);
  }

  @MessagePattern({ cmd: 'updateAProductTag' })
  async updateAProductTag({ tag_id, data }: { tag_id: number; data: any }): Promise<any> {
    return await this.tagService.updateAProductTag(tag_id, data);
  }

  @MessagePattern({ cmd: 'deleteAProductTag' })
  async deleteAProductTag({ tag_id }: { tag_id: number }): Promise<any> {
    return await this.tagService.deleteAProductTag(tag_id);
  }
}
