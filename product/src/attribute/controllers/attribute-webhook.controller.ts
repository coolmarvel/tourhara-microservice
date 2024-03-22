import { Controller, VERSION_NEUTRAL } from '@nestjs/common';
import { AttributeWebhookService } from '../services/attribute-webhook.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller({ path: 'product-attribute-webhook', version: VERSION_NEUTRAL })
export class AttributeWebhookController {
  constructor(private readonly attributeWebhookService: AttributeWebhookService) {}

  @MessagePattern({ cmd: 'productAttributeCreated_stag' })
  async productAttributeCreated_stag(payload: any) {
    return await this.attributeWebhookService.productAttributeCreated_stag(payload);
  }

  @MessagePattern({ cmd: 'productAttributeUpdated_stag' })
  async productAttributeUpdated_stag(payload: any) {
    return await this.attributeWebhookService.productAttributeUpdated_stag(payload);
  }

  @MessagePattern({ cmd: 'productAttributeDeleted_stag' })
  async productAttributeDeleted_stag(payload: any) {
    return await this.attributeWebhookService.productAttributeDeleted_stag(payload);
  }

  @MessagePattern({ cmd: 'productAttributeRestored_stag' })
  async productAttributeRestored_stag(payload: any) {
    return await this.attributeWebhookService.productAttributeRestored_stag(payload);
  }

  @MessagePattern({ cmd: 'productAttributeCreated_prod' })
  async productAttributeCreated_prod(payload: any) {
    return await this.attributeWebhookService.productAttributeCreated_prod(payload);
  }

  @MessagePattern({ cmd: 'productAttributeUpdated_prod' })
  async productAttributeUpdated_prod(payload: any) {
    return await this.attributeWebhookService.productAttributeUpdated_prod(payload);
  }

  @MessagePattern({ cmd: 'productAttributeDeleted_prod' })
  async productAttributeDeleted_prod(payload: any) {
    return await this.attributeWebhookService.productAttributeDeleted_prod(payload);
  }

  @MessagePattern({ cmd: 'productAttributeRestored_prod' })
  async productAttributeRestored_prod(payload: any) {
    return await this.attributeWebhookService.productAttributeRestored_prod(payload);
  }
}
