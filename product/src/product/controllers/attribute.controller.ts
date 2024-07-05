import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { AttributeService } from '../services/attribute.service';

@Controller()
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}

  @MessagePattern({ cmd: 'createAProductAttribute' })
  async createAProductAttribute(data: any): Promise<any> {
    return await this.attributeService.createAProductAttribute(data);
  }

  @MessagePattern({ cmd: 'retrieveAProductAttribute' })
  async retrieveAProductAttribute({ attribute_id }: { attribute_id: number }): Promise<any> {
    return await this.attributeService.retrieveAProductAttribute(attribute_id);
  }

  @MessagePattern({ cmd: 'listAllProductAttributes' })
  async listAllProductAttributes({ page, size }: { page: number; size: number }): Promise<any> {
    return await this.attributeService.listAllProductAttributes(page, size);
  }

  @MessagePattern({ cmd: 'updateAProductAttribute' })
  async updateAProductAttribute({ attribute_id, data }: { attribute_id: number; data: any }): Promise<any> {
    return await this.attributeService.updateAProductAttribute(attribute_id, data);
  }

  @MessagePattern({ cmd: 'deleteAProductAttribute' })
  async deleteAProductAttribute({ attribute_id }: { attribute_id: number }): Promise<any> {
    return await this.attributeService.deleteAProductAttribute(attribute_id);
  }
}
