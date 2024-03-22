import { Controller, VERSION_NEUTRAL } from '@nestjs/common';

@Controller({ path: 'api/product/category/webhook', version: VERSION_NEUTRAL })
export class ProductCategoryWebhookController {}
