import { Controller } from '@nestjs/common';
import { TagProductionService } from '../services/tag-production.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class TagProductionController {
  constructor(private readonly tagProductionService: TagProductionService) {}

  @MessagePattern({ cmd: 'createAProductTag_woocommerce_production' })
  async createAProductTag(data: any): Promise<any> {
    return await this.tagProductionService.createAProductTag(data);
  }

  @MessagePattern({ cmd: 'retrieveAProductTag_woocommerce_production' })
  async retrieveAProductTag({ attribute_id }: { attribute_id: number }): Promise<any> {
    return await this.tagProductionService.retrieveAProductTag(attribute_id);
  }

  @MessagePattern({ cmd: 'listAllProductTags_woocommerce_production' })
  async listAllProductTags({ page, size }: { page: number; size: number }): Promise<any> {
    return await this.tagProductionService.listAllProductTags(page, size);
  }

  @MessagePattern({ cmd: 'updateAProductTag_woocommerce_production' })
  async updateAProductTag({ attribute_id, data }: { attribute_id: number; data: any }): Promise<any> {
    return await this.tagProductionService.updateAProductTag(attribute_id, data);
  }

  @MessagePattern({ cmd: 'deleteAProductTag_woocommerce_production' })
  async deleteAProductTag({ attribute_id }: { attribute_id: number }): Promise<any> {
    return await this.tagProductionService.deleteAProductTag(attribute_id);
  }
}
