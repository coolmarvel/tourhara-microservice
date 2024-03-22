import { Controller, VERSION_NEUTRAL } from '@nestjs/common';

@Controller({ path: 'api/product/attribute/webhook', version: VERSION_NEUTRAL })
export class ProductAttributeWebhookController {}
