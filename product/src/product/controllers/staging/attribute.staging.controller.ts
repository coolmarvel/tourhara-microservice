import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AttributeStagingService } from 'src/product/services/staging/attribute.staging.service';

Controller();
export class AttributeStagingController {
  constructor(private readonly attributeService: AttributeStagingService) {}

  @MessagePattern({ cmd: 'createAProductAttribute_staging' })
  async createAProductAttribute(data: any): Promise<any> {
    return await this.attributeService.createAProductAttribute(data);
  }

  @MessagePattern({ cmd: 'retrieveAProductAttribute_staging' })
  async retrieveAProductAttribute({ attribute_id }: { attribute_id: number }): Promise<any> {
    return await this.attributeService.retrieveAProductAttribute(attribute_id);
  }

  @MessagePattern({ cmd: 'listAllProductAttributes_staging' })
  async listAllProductAttributes({ page, size }: { page: number; size: number }): Promise<any> {
    return await this.attributeService.listAllProductAttributes(page, size);
  }

  @MessagePattern({ cmd: 'updateAProductAttribute_staging' })
  async updateAProductAttribute({ attribute_id, data }: { attribute_id: number; data: any }): Promise<any> {
    return await this.attributeService.updateAProductAttribute(attribute_id, data);
  }

  @MessagePattern({ cmd: 'deleteAProductAttribute_staging' })
  async deleteAProductAttribute({ attribute_id }: { attribute_id: number }): Promise<any> {
    return await this.attributeService.deleteAProductAttribute(attribute_id);
  }
}
