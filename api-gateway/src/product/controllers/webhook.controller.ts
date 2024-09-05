import { Body, Controller, Headers, HttpStatus, Post, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { WebhookService } from '../services/webhook.service';
import { Public } from '../../common';

@ApiTags('Product')
@Controller({ path: 'api/product-webhook', version: VERSION_NEUTRAL })
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Public()
  @Post('created')
  @ApiOperation({ summary: '단일 상품 생성 WEBHOOK' })
  async productCreated(@Headers() header: any, @Body() payload: any) {
    if (header['x-wc-webhook-topic'] !== 'product.created') return HttpStatus.NO_CONTENT;
    console.log(header);

    const result = await this.webhookService.productCreated(payload);

    if (result) return HttpStatus.OK;
    else return HttpStatus.BAD_REQUEST;
  }

  @Public()
  @Post('updated')
  @ApiOperation({ summary: '단일 상품 갱신 WEBHOOK' })
  async productUpdated(@Headers() header: any, @Body() payload: any) {
    if (header['x-wc-webhook-topic'] !== 'product.updated') return HttpStatus.NO_CONTENT;
    console.log(header);

    const result = await this.webhookService.productUpdated(payload);

    if (result) return HttpStatus.OK;
    else return HttpStatus.BAD_REQUEST;
  }

  @Public()
  @Post('deleted')
  @ApiOperation({ summary: '단일 상품 삭제 WEBHOOK' })
  async productDeleted(@Headers() header: any, @Body() payload: any) {
    if (header['x-wc-webhook-topic'] !== 'product.deleted') return HttpStatus.NO_CONTENT;
    console.log(header);

    const result = await this.webhookService.productDeleted(payload);

    if (result) return HttpStatus.OK;
    else return HttpStatus.BAD_REQUEST;
  }

  @Public()
  @Post('restored')
  @ApiOperation({ summary: '단일 상품 복원 WEBHOOK' })
  async productRestored(@Headers() header: any, @Body() payload: any) {
    if (header['x-wc-webhook-topic'] !== 'product.restored') return HttpStatus.NO_CONTENT;
    console.log(header);

    const result = await this.webhookService.productRestored(payload);

    if (result) return HttpStatus.OK;
    else return HttpStatus.BAD_REQUEST;
  }
}
