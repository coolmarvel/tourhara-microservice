import { Body, Controller, Post, VERSION_NEUTRAL } from '@nestjs/common';
import { ProductWebhookService } from '../../services/product-webhook.service';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller({ path: 'api/product/webhook', version: VERSION_NEUTRAL })
export class ProductWebhookController {
  constructor(private readonly productWebhookService: ProductWebhookService) {}

  @Public()
  @ApiTags('Product-Webhook')
  @Post('stag/created')
  @ApiOperation({ summary: '단일 상품 생성 WEBHOOK (STAGING)' })
  async productCreated_stag(@Body() data: any) {
    return await this.productWebhookService.productCreated_stag(data);
  }

  @Public()
  @ApiTags('Product-Webhook')
  @Post('stag/updated')
  @ApiOperation({ summary: '단일 상품 갱신 WEBHOOK (STAGING)' })
  async productUpdated_stag(@Body() data: any) {
    return await this.productWebhookService.productUpdated_stag(data);
  }

  @Public()
  @ApiTags('Product-Webhook')
  @Post('stag/deleted')
  @ApiOperation({ summary: '단일 상품 삭제 WEBHOOK (STAGING)' })
  async productDeleted_stag(@Body() data: any) {
    return await this.productWebhookService.productDeleted_stag(data);
  }

  @Public()
  @ApiTags('Product-Webhook')
  @Post('stag/restored')
  @ApiOperation({ summary: '단일 상품 복원 WEBHOOK (STAGING)' })
  async productRestored_stag(@Body() data: any) {
    return await this.productWebhookService.productRestored_stag(data);
  }
}
