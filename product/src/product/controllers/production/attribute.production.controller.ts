import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AttributeProductionService } from 'src/product/services/production/attribute.production.service';

Controller();
export class AttributeProductionController {
  constructor(private readonly attributeService: AttributeProductionService) {}

  @MessagePattern({ cmd: 'createAProductAttribute_production' })
  async createAProductAttribute(data: any): Promise<any> {
    return await this.attributeService.createAProductAttribute(data);
  }

  @MessagePattern({ cmd: 'retrieveAProductAttribute_production' })
  async retrieveAProductAttribute({ attribute_id }: { attribute_id: number }): Promise<any> {
    return await this.attributeService.retrieveAProductAttribute(attribute_id);
  }

  @MessagePattern({ cmd: 'listAllProductAttributes_production' })
  async listAllProductAttributes({ page, size }: { page: number; size: number }): Promise<any> {
    return await this.attributeService.listAllProductAttributes(page, size);
  }

  @MessagePattern({ cmd: 'updateAProductAttribute_production' })
  async updateAProductAttribute({ attribute_id, data }: { attribute_id: number; data: any }): Promise<any> {
    return await this.attributeService.updateAProductAttribute(attribute_id, data);
  }

  @MessagePattern({ cmd: 'deleteAProductAttribute_production' })
  async deleteAProductAttribute({ attribute_id }: { attribute_id: number }): Promise<any> {
    return await this.attributeService.deleteAProductAttribute(attribute_id);
  }
}
