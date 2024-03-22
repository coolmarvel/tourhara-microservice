import { Controller, VERSION_NEUTRAL } from '@nestjs/common';
import { CategoryWebhookService } from '../services/category-webhook.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller({ path: 'product-category-webhook', version: VERSION_NEUTRAL })
export class CategoryWebhookController {
  constructor(private readonly categoryWebhookService: CategoryWebhookService) {}

  @MessagePattern({ cmd: 'productCategoryCreated_stag' })
  async productCategoryCreated_stag(payload: any) {
    return await this.categoryWebhookService.productCategoryCreated_stag(payload);
  }

  @MessagePattern({ cmd: 'productCategoryUpdated_stag' })
  async productCategoryUpdated_stag(payload: any) {
    return await this.categoryWebhookService.productCategoryUpdated_stag(payload);
  }

  @MessagePattern({ cmd: 'productCategoryDeleted_stag' })
  async productCategoryDeleted_stag(payload: any) {
    return await this.categoryWebhookService.productCategoryDeleted_stag(payload);
  }

  @MessagePattern({ cmd: 'productCategoryRestored_stag' })
  async productCategoryRestored_stag(payload: any) {
    return await this.categoryWebhookService.productCategoryRestored_stag(payload);
  }

  @MessagePattern({ cmd: 'productCategoryCreated_prod' })
  async productCategoryCreated_prod(payload: any) {
    return await this.categoryWebhookService.productCategoryCreated_prod(payload);
  }

  @MessagePattern({ cmd: 'productCategoryUpdated_prod' })
  async productCategoryUpdated_prod(payload: any) {
    return await this.categoryWebhookService.productCategoryUpdated_prod(payload);
  }

  @MessagePattern({ cmd: 'productCategoryDeleted_prod' })
  async productCategoryDeleted_prod(payload: any) {
    return await this.categoryWebhookService.productCategoryDeleted_prod(payload);
  }

  @MessagePattern({ cmd: 'productCategoryRestored_prod' })
  async productCategoryRestored_prod(payload: any) {
    return await this.categoryWebhookService.productCategoryRestored_prod(payload);
  }
}
