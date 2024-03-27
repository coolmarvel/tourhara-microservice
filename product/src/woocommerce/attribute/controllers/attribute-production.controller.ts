import { Controller } from '@nestjs/common';
import { AttributeProductionService } from '../services/attribute-production.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AttributeProductionController {
  constructor(private readonly attributeProductionService: AttributeProductionService) {}

  @MessagePattern({ cmd: 'createAProductAttribute_woocommerce_production' })
  async createAProductAttribute(data: any): Promise<any> {
    return await this.attributeProductionService.createAProductAttribute(data);
  }

  @MessagePattern({ cmd: 'retrieveAProductAttribute_woocommerce_production' })
  async retrieveAProductAttribute({ attribute_id }: { attribute_id: number }): Promise<any> {
    return await this.attributeProductionService.retrieveAProductAttribute(attribute_id);
  }

  @MessagePattern({ cmd: 'listAllProductAttributes_woocommerce_production' })
  async listAllProductAttributes({ page, size }: { page: number; size: number }): Promise<any> {
    return await this.attributeProductionService.listAllProductAttributes(page, size);
  }

  @MessagePattern({ cmd: 'updateAProductAttribute_woocommerce_production' })
  async updateAProductAttribute({ attribute_id, data }: { attribute_id: number; data: any }): Promise<any> {
    return await this.attributeProductionService.updateAProductAttribute(attribute_id, data);
  }

  @MessagePattern({ cmd: 'deleteAProductAttribute_woocommerce_production' })
  async deleteAProductAttribute({ attribute_id }: { attribute_id: number }): Promise<any> {
    return await this.attributeProductionService.deleteAProductAttribute(attribute_id);
  }
}
