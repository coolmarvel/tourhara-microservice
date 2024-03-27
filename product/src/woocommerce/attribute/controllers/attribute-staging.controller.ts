import { Controller } from '@nestjs/common';
import { AttributeStagingService } from '../services/attribute-staging.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AttributeStagingController {
  constructor(private readonly attributeStagingService: AttributeStagingService) {}

  @MessagePattern({ cmd: 'createAProductAttribute_woocommerce_staging' })
  async createAProductAttribute(data: any): Promise<any> {
    return await this.attributeStagingService.createAProductAttribute(data);
  }

  @MessagePattern({ cmd: 'retrieveAProductAttribute_woocommerce_staging' })
  async retrieveAProductAttribute({ attribute_id }: { attribute_id: number }): Promise<any> {
    return await this.attributeStagingService.retrieveAProductAttribute(attribute_id);
  }

  @MessagePattern({ cmd: 'listAllProductAttributes_woocommerce_staging' })
  async listAllProductAttributes({ page, size }: { page: number; size: number }): Promise<any> {
    return await this.attributeStagingService.listAllProductAttributes(page, size);
  }

  @MessagePattern({ cmd: 'updateAProductAttribute_woocommerce_staging' })
  async updateAProductAttribute({ attribute_id, data }: { attribute_id: number; data: any }): Promise<any> {
    return await this.attributeStagingService.updateAProductAttribute(attribute_id, data);
  }

  @MessagePattern({ cmd: 'deleteAProductAttribute_woocommerce_staging' })
  async deleteAProductAttribute({ attribute_id }: { attribute_id: number }): Promise<any> {
    return await this.attributeStagingService.deleteAProductAttribute(attribute_id);
  }
}
