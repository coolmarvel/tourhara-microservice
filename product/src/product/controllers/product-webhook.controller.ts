import { Controller, VERSION_NEUTRAL } from '@nestjs/common';
import { ProductWebhookService } from '../services/product-webhook.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller({ path: 'product-webhook', version: VERSION_NEUTRAL })
export class ProductWebhookController {
  constructor(private readonly productWebhookService: ProductWebhookService) {}

  @MessagePattern({ cmd: 'productCreated_stag' })
  async productCreated_stag(payload: any) {
    return await this.productWebhookService.productCreated_stag(payload);
  }

  @MessagePattern({ cmd: 'productUpdated_stag' })
  async productUpdated_stag(payload: any) {
    return await this.productWebhookService.productUpdated_stag(payload);
  }

  @MessagePattern({ cmd: 'productDeleted_stag' })
  async productDeleted_stag(payload: any) {
    return await this.productWebhookService.productDeleted_stag(payload);
  }

  @MessagePattern({ cmd: 'productRestored_stag' })
  async productRestored_stag(payload: any) {
    return await this.productWebhookService.productRestored_stag(payload);
  }

  @MessagePattern({ cmd: 'productCreated_prod' })
  async productCreated_prod(payload: any) {
    return await this.productWebhookService.productCreated_prod(payload);
  }

  @MessagePattern({ cmd: 'productUpdated_prod' })
  async productUpdated_prod(payload: any) {
    return await this.productWebhookService.productUpdated_prod(payload);
  }

  @MessagePattern({ cmd: 'productDeleted_prod' })
  async productDeleted_prod(payload: any) {
    return await this.productWebhookService.productDeleted_prod(payload);
  }

  @MessagePattern({ cmd: 'productRestored_prod' })
  async productRestored_prod(payload: any) {
    return await this.productWebhookService.productRestored_prod(payload);
  }
}
