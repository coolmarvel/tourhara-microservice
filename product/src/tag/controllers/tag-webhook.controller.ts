import { Controller, VERSION_NEUTRAL } from '@nestjs/common';
import { TagWebhookService } from '../services/tag-webhook.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller({ path: 'product-tag-webhook', version: VERSION_NEUTRAL })
export class TagWebhookController {
  constructor(private readonly tagWebhookService: TagWebhookService) {}

  @MessagePattern({ cmd: 'productTagCreated_stag' })
  async productTagCreated_stag(payload: any) {
    return await this.tagWebhookService.productTagCreated_stag(payload);
  }

  @MessagePattern({ cmd: 'productTagUpdated_stag' })
  async productTagUpdated_stag(payload: any) {
    return await this.tagWebhookService.productTagUpdated_stag(payload);
  }

  @MessagePattern({ cmd: 'productTagDeleted_stag' })
  async productTagDeleted_stag(payload: any) {
    return await this.tagWebhookService.productTagDeleted_stag(payload);
  }

  @MessagePattern({ cmd: 'productTagRestored_stag' })
  async productTagRestored_stag(payload: any) {
    return await this.tagWebhookService.productTagRestored_stag(payload);
  }

  @MessagePattern({ cmd: 'productTagCreated_prod' })
  async productTagCreated_prod(payload: any) {
    return await this.tagWebhookService.productTagCreated_prod(payload);
  }

  @MessagePattern({ cmd: 'productTagUpdated_prod' })
  async productTagUpdated_prod(payload: any) {
    return await this.tagWebhookService.productTagUpdated_prod(payload);
  }

  @MessagePattern({ cmd: 'productTagDeleted_prod' })
  async productTagDeleted_prod(payload: any) {
    return await this.tagWebhookService.productTagDeleted_prod(payload);
  }

  @MessagePattern({ cmd: 'productTagRestored_prod' })
  async productTagRestored_prod(payload: any) {
    return await this.tagWebhookService.productTagRestored_prod(payload);
  }
}
