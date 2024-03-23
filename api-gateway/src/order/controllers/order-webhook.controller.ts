import { Controller, Post, Headers, VERSION_NEUTRAL, Body } from '@nestjs/common';
import { OrderWebhookService } from '../services/order-webhook.service';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller({ path: 'api/order/webhook', version: VERSION_NEUTRAL })
export class OrderWebhookController {
  constructor(private readonly orderWebhookService: OrderWebhookService) {}

  @Public()
  @ApiTags('Order-Webhook')
  @Post('stag/created')
  @ApiOperation({ summary: '단일 주문 생성 WEBHOOK (스테이징)' })
  async orderCreated_stag(@Headers() header: any, @Body() data: any) {
    console.log(header);

    return await this.orderWebhookService.orderCreated_stag(data);
  }

  @Public()
  @ApiTags('Order-Webhook')
  @Post('stag/updated')
  @ApiOperation({ summary: '단일 주문 갱신 WEBHOOK (스테이징)' })
  async orderUpdated_stag(@Body() data: any) {
    return await this.orderWebhookService.orderUpdated_stag(data);
  }

  @Public()
  @ApiTags('Order-Webhook')
  @Post('stag/deleted')
  @ApiOperation({ summary: '단일 주문 삭제 WEBHOOK (스테이징)' })
  async orderDeleted_stag(@Body() data: any) {
    return await this.orderWebhookService.orderDeleted_stag(data);
  }

  @Public()
  @ApiTags('Order-Webhook')
  @Post('stag/restored')
  @ApiOperation({ summary: '단일 주문 복원 WEBHOOK (스테이징)' })
  async orderRestored_stag(@Body() data: any) {
    return await this.orderWebhookService.orderRestored_stag(data);
  }

  @Public()
  @ApiTags('Order-Webhook')
  @Post('prod/created')
  @ApiOperation({ summary: '단일 주문 생성 WEBHOOK (프로덕션)' })
  async orderCreated_prod(@Body() data: any) {
    return await this.orderWebhookService.orderCreated_prod(data);
  }

  @Public()
  @ApiTags('Order-Webhook')
  @Post('prod/updated')
  @ApiOperation({ summary: '단일 주문 갱신 WEBHOOK (프로덕션)' })
  async orderUpdated_prod(@Body() data: any) {
    return await this.orderWebhookService.orderUpdated_prod(data);
  }

  @Public()
  @ApiTags('Order-Webhook')
  @Post('prod/deleted')
  @ApiOperation({ summary: '단일 주문 삭제 WEBHOOK (프로덕션)' })
  async orderDeleted_prod(@Body() data: any) {
    return await this.orderWebhookService.orderDeleted_prod(data);
  }

  @Public()
  @ApiTags('Order-Webhook')
  @Post('prod/restored')
  @ApiOperation({ summary: '단일 주문 복원 WEBHOOK (프로덕션)' })
  async orderRestored_prod(@Body() data: any) {
    return await this.orderWebhookService.orderRestored_prod(data);
  }
}
