import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { WebhookService } from '../services';

@Controller()
export default class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @MessagePattern({ cmd: 'productCreated' })
  async productCreated(payload: any): Promise<any> {
    return await this.webhookService.productCreated(payload);
  }

  @MessagePattern({ cmd: 'productUpdated' })
  async productUpdated(payload: any): Promise<any> {
    return await this.webhookService.productUpdated(payload);
  }

  @MessagePattern({ cmd: 'productDeleted' })
  async productDeleted(payload: any): Promise<any> {
    return await this.webhookService.productDeleted(payload);
  }

  @MessagePattern({ cmd: 'productRestored' })
  async productRestored(payload: any): Promise<any> {
    return await this.webhookService.productRestored(payload);
  }
}
