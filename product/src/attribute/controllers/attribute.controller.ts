import { Controller, VERSION_NEUTRAL } from '@nestjs/common';
import { AttributeService } from '../services/attribute.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller({ path: 'product/attribute', version: VERSION_NEUTRAL })
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}

  // WooCommerce Staging Product Attribute APIs
  @MessagePattern({ cmd: 'createAProductAttribute_stag' })
  async createAProductAttribute_stag(data) {
    return await this.attributeService.createAProductAttribute_stag(data);
  }

  @MessagePattern({ cmd: 'retrieveAProductAttribute_stag' })
  async retrieveAProductAttribute_stag({ attribute_id }: { attribute_id: string }) {
    return await this.attributeService.retrieveAProductAttribute_stag(attribute_id);
  }

  @MessagePattern({ cmd: 'listAllProductAttributes_stag' })
  async listAllProductAttributes_stag({ page, size }: { page: number; size: number }) {
    return await this.attributeService.listAllProductAttributes_stag(page, size);
  }

  @MessagePattern({ cmd: 'updateAProductAttribute_stag' })
  async updateAProductAttribute_stag({ attribute_id, data }: { attribute_id: string; data: any }) {
    return await this.attributeService.updateAProductAttribute_stag(attribute_id, data);
  }

  @MessagePattern({ cmd: 'deleteAProductAttribute_stag' })
  async deleteAProductAttribute_stag({ attribute_id }: { attribute_id: string }) {
    return await this.attributeService.deleteAProductAttribute_stag(attribute_id);
  }

  // WooCommerce Production Product Attribute APIs
  @MessagePattern({ cmd: 'createAProductAttribute_prod' })
  async createAProductAttribute_prod(data) {
    return await this.attributeService.createAProductAttribute_prod(data);
  }

  @MessagePattern({ cmd: 'retrieveAProductAttribute_prod' })
  async retrieveAProductAttribute_prod({ attribute_id }: { attribute_id: string }) {
    return await this.attributeService.retrieveAProductAttribute_prod(attribute_id);
  }

  @MessagePattern({ cmd: 'listAllProductAttributes_prod' })
  async listAllProductAttributes_prod({ page, size }: { page: number; size: number }) {
    return await this.attributeService.listAllProductAttributes_prod(page, size);
  }

  @MessagePattern({ cmd: 'updateAProductAttribute_prod' })
  async updateAProductAttribute_prod({ attribute_id, data }: { attribute_id: string; data: any }) {
    return await this.attributeService.updateAProductAttribute_prod(attribute_id, data);
  }

  @MessagePattern({ cmd: 'deleteAProductAttribute_prod' })
  async deleteAProductAttribute_prod({ attribute_id }: { attribute_id: string }) {
    return await this.attributeService.deleteAProductAttribute_prod(attribute_id);
  }

  // --
  @MessagePattern({ cmd: 'insertProductAttribute_prod' })
  async insertProductAttribute_prod() {
    return await this.attributeService.insertProductAttribute_prod();
  }
}
