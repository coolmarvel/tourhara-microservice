import { Controller, VERSION_NEUTRAL } from '@nestjs/common';
import { TagService } from '../services/tag.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller({ path: 'product/tag', version: VERSION_NEUTRAL })
export class TagController {
  constructor(private readonly tagService: TagService) {}

  // WooCommerce Staging Product Tags APIs
  @MessagePattern({ cmd: 'createAProductTag_stag' })
  async createAProductTag_stag(data) {
    return await this.tagService.createAProductTag_stag(data);
  }

  @MessagePattern({ cmd: 'retrieveAProductTag_stag' })
  async retrieveAProductTag_stag({ tag_id }: { tag_id: string }) {
    return await this.tagService.retrieveAProductTag_stag(tag_id);
  }

  @MessagePattern({ cmd: 'listAllProductTags_stag' })
  async listAllProductTags_stag({ page, size }: { page: number; size: number }) {
    return await this.tagService.listAllProductTags_stag(page, size);
  }

  @MessagePattern({ cmd: 'updateAProductTag_stag' })
  async updateAProductTag_stag({ tag_id, data }: { tag_id: string; data: any }) {
    return await this.tagService.updateAProductTag_stag(tag_id, data);
  }

  @MessagePattern({ cmd: 'deleteAProductTag_stag' })
  async deleteAProductTag_stag({ tag_id }: { tag_id: string }) {
    return await this.tagService.deleteAProductTag_stag(tag_id);
  }

  // WooCommerce Production Product Tags APIs
  @MessagePattern({ cmd: 'createAProductTag_prod' })
  async createAProductTag_prod(data) {
    return await this.tagService.createAProductTag_prod(data);
  }

  @MessagePattern({ cmd: 'retrieveAProductTag_prod' })
  async retrieveAProductTag_prod({ tag_id }: { tag_id: string }) {
    return await this.tagService.retrieveAProductTag_prod(tag_id);
  }

  @MessagePattern({ cmd: 'listAllProductTags_prod' })
  async listAllProductTags_prod({ page, size }: { page: number; size: number }) {
    return await this.tagService.listAllProductTags_prod(page, size);
  }

  @MessagePattern({ cmd: 'updateAProductTag_prod' })
  async updateAProductTag_prod({ tag_id, data }: { tag_id: string; data: any }) {
    return await this.tagService.updateAProductTag_prod(tag_id, data);
  }

  @MessagePattern({ cmd: 'deleteAProductTag_prod' })
  async deleteAProductTag_prod({ tag_id }: { tag_id: string }) {
    return await this.tagService.deleteAProductTag_prod(tag_id);
  }

  //

  @MessagePattern({ cmd: 'insertProductTag_prod' })
  async insertProductTag_prod() {
    return await this.tagService.insertProductTag_prod();
  }
}
