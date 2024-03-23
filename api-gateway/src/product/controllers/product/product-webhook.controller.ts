import { Body, Controller, Headers, Post, VERSION_NEUTRAL } from '@nestjs/common';
import { ProductWebhookService } from '../../services/product/product-webhook.service';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller({ path: 'api/product/webhook', version: VERSION_NEUTRAL })
export class ProductWebhookController {
  constructor(private readonly productWebhookService: ProductWebhookService) {}

  @Public()
  @ApiTags('Product-Webhook')
  @Post('stag/created')
  @ApiOperation({ summary: '단일 상품 생성 WEBHOOK (스테이징)' })
  async productCreated_stag(@Headers() header: any, @Body() data: any) {
    console.log(header);

    return await this.productWebhookService.productCreated_stag(data);
  }

  @Public()
  @ApiTags('Product-Webhook')
  @Post('stag/updated')
  @ApiOperation({ summary: '단일 상품 갱신 WEBHOOK (스테이징)' })
  async productUpdated_stag(@Body() data: any) {
    return await this.productWebhookService.productUpdated_stag(data);
  }

  @Public()
  @ApiTags('Product-Webhook')
  @Post('stag/deleted')
  @ApiOperation({ summary: '단일 상품 삭제 WEBHOOK (스테이징)' })
  async productDeleted_stag(@Body() data: any) {
    return await this.productWebhookService.productDeleted_stag(data);
  }

  @Public()
  @ApiTags('Product-Webhook')
  @Post('stag/restored')
  @ApiOperation({ summary: '단일 상품 복원 WEBHOOK (스테이징)' })
  async productRestored_stag(@Body() data: any) {
    return await this.productWebhookService.productRestored_stag(data);
  }

  @Public()
  @ApiTags('Product-Webhook')
  @Post('prod/created')
  @ApiOperation({ summary: '단일 상품 생성 WEBHOOK (프로덕션)' })
  async productCreated_prod(@Body() data: any) {
    return await this.productWebhookService.productCreated_prod(data);
  }

  @Public()
  @ApiTags('Product-Webhook')
  @Post('prod/updated')
  @ApiOperation({ summary: '단일 상품 갱신 WEBHOOK (프로덕션)' })
  async productUpdated_prod(@Body() data: any) {
    return await this.productWebhookService.productUpdated_prod(data);
  }

  @Public()
  @ApiTags('Product-Webhook')
  @Post('prod/deleted')
  @ApiOperation({ summary: '단일 상품 삭제 WEBHOOK (프로덕션)' })
  async productDeleted_prod(@Body() data: any) {
    return await this.productWebhookService.productDeleted_prod(data);
  }

  @Public()
  @ApiTags('Product-Webhook')
  @Post('prod/restored')
  @ApiOperation({ summary: '단일 상품 복원 WEBHOOK (프로덕션)' })
  async productRestored_prod(@Body() data: any) {
    return await this.productWebhookService.productRestored_prod(data);
  }
}
