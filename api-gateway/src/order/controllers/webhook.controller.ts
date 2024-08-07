import { Body, Controller, Headers, HttpStatus, Post, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { WebhookService } from '../services/webhook.service';
import { Public } from '../../common';

@ApiTags('Order')
@Controller({ path: 'api/order-webhook', version: VERSION_NEUTRAL })
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Public()
  @Post('created')
  @ApiOperation({ summary: '단일 주문 생성 WEBHOOK' })
  async orderCreated(@Headers() header: any, @Body() data: any) {
    if (header['x-wc-webhook-topic'] !== 'order.created') return HttpStatus.NO_CONTENT;
    console.log(header);

    const result = await this.webhookService.orderCreated(data);

    if (result) return HttpStatus.OK;
    else return HttpStatus.BAD_REQUEST;
  }

  @Public()
  @Post('updated')
  @ApiOperation({ summary: '단일 주문 갱신 WEBHOOK' })
  async orderUpdated(@Headers() header: any, @Body() data: any) {
    if (header['x-wc-webhook-topic'] !== 'order.updated') return HttpStatus.NO_CONTENT;
    console.log(header);

    const result = await this.webhookService.orderUpdated(data);
    if (result) return HttpStatus.OK;
  }

  @Public()
  @Post('deleted')
  @ApiOperation({ summary: '단일 주문 삭제 WEBHOOK' })
  async orderDeleted(@Headers() header: any, @Body() data: any) {
    if (header['x-wc-webhook-topic'] !== 'order.deleted') return HttpStatus.NO_CONTENT;
    console.log(header);

    return await this.webhookService.orderDeleted(data);
  }

  @Public()
  @Post('restored')
  @ApiOperation({ summary: '단일 주문 복원 WEBHOOK' })
  async orderRestored(@Headers() header: any, @Body() data: any) {
    if (header['x-wc-webhook-topic'] !== 'order.restored') return HttpStatus.NO_CONTENT;
    console.log(header);

    return await this.webhookService.orderRestored(data);
  }
}
