import { Controller, VERSION_NEUTRAL } from '@nestjs/common';

@Controller({ path: 'api/product/tag/webhook', version: VERSION_NEUTRAL })
export class ProductTagWebhookController {}
