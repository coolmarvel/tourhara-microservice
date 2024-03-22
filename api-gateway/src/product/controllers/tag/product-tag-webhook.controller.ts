import { Body, Controller, Post, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { ProductTagWebhookService } from 'src/product/services/tag/product-tag-webhook.service';

@Controller({ path: 'api/product/tag/webhook', version: VERSION_NEUTRAL })
export class ProductTagWebhookController {
  constructor(private readonly productTagWebhookService: ProductTagWebhookService) {}

  @Public()
  @ApiTags('Product-Tag-Webhook')
  @Post('stag/created')
  @ApiOperation({ summary: '단일 상품 카테고리 생성 WEBHOOK (스테이징)' })
  async productTagCreated_stag(@Body() data: any) {
    return await this.productTagWebhookService.productTagCreated_stag(data);
  }

  @Public()
  @ApiTags('Product-Tag-Webhook')
  @Post('stag/updated')
  @ApiOperation({ summary: '단일 상품 카테고리 갱신 WEBHOOK (스테이징)' })
  async productTagUpdated_stag(@Body() data: any) {
    return await this.productTagWebhookService.productTagUpdated_stag(data);
  }

  @Public()
  @ApiTags('Product-Tag-Webhook')
  @Post('stag/deleted')
  @ApiOperation({ summary: '단일 상품 카테고리 삭제 WEBHOOK (스테이징)' })
  async productTagDeleted_stag(@Body() data: any) {
    return await this.productTagWebhookService.productTagDeleted_stag(data);
  }

  @Public()
  @ApiTags('Product-Tag-Webhook')
  @Post('stag/restored')
  @ApiOperation({ summary: '단일 상품 카테고리 복원 WEBHOOK (스테이징)' })
  async productTagRestored_stag(@Body() data: any) {
    return await this.productTagWebhookService.productTagRestored_stag(data);
  }

  @Public()
  @ApiTags('Product-Tag-Webhook')
  @Post('prod/created')
  @ApiOperation({ summary: '단일 상품 카테고리 생성 WEBHOOK (프로덕션)' })
  async productTagCreated_prod(@Body() data: any) {
    return await this.productTagWebhookService.productTagCreated_prod(data);
  }

  @Public()
  @ApiTags('Product-Tag-Webhook')
  @Post('prod/updated')
  @ApiOperation({ summary: '단일 상품 카테고리 갱신 WEBHOOK (프로덕션)' })
  async productTagUpdated_prod(@Body() data: any) {
    return await this.productTagWebhookService.productTagUpdated_prod(data);
  }

  @Public()
  @ApiTags('Product-Tag-Webhook')
  @Post('prod/deleted')
  @ApiOperation({ summary: '단일 상품 카테고리 삭제 WEBHOOK (프로덕션)' })
  async productTagDeleted_prod(@Body() data: any) {
    return await this.productTagWebhookService.productTagDeleted_prod(data);
  }

  @Public()
  @ApiTags('Product-Tag-Webhook')
  @Post('prod/restored')
  @ApiOperation({ summary: '단일 상품 카테고리 복원 WEBHOOK (프로덕션)' })
  async productTagRestored_prod(@Body() data: any) {
    return await this.productTagWebhookService.productTagRestored_prod(data);
  }
}
