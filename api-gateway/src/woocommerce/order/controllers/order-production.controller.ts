import { Body, Controller, Delete, Get, Param, Post, Put, Headers, Query, VERSION_NEUTRAL, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrderProductionService } from '../services/order-production.service';
import { CreateOrderReqDto, DeleteOrderReqDto, RetrieveOrderReqDto, UpdateOrderBodyReqDto, UpdateOrderParamReqDto } from '../dtos/req.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { PageReqDto } from 'src/common/dtos/req.dto';
import { WebhookHeaderReqDto } from 'src/woocommerce/product/dtos/webhook-req.dto';

@ApiTags('WooCommerce-Order-Production')
@Controller({ path: 'api/order/production', version: VERSION_NEUTRAL })
export class OrderProductionController {
  constructor(private readonly orderProductionService: OrderProductionService) {}

  /**
   * WooCommerce
   */
  @Public()
  @Post()
  @ApiOperation({ summary: '단일 주문 생성 API (프로덕션)' })
  async createAnOrder(@Body() data: CreateOrderReqDto) {
    return await this.orderProductionService.createAnOrder(data);
  }

  @Public()
  @Get(':order_id')
  @ApiOperation({ summary: '단일 주문 조회 API (프로덕션)' })
  async retrieveAnOrder(@Param() { order_id }: RetrieveOrderReqDto) {
    return await this.orderProductionService.retrieveAnOrder(order_id);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: '주문 리스트 조회 API (프로덕션)' })
  async listAllOrders(@Query() { page, size }: PageReqDto) {
    return await this.orderProductionService.listAllOrders(page, size);
  }

  @Public()
  @Put(':order_id')
  @ApiOperation({ summary: '단일 주문 갱신 API (프로덕션)' })
  async updateAnOrder(@Param() { order_id }: UpdateOrderParamReqDto, @Body() data: UpdateOrderBodyReqDto) {
    return await this.orderProductionService.updateAnOrder(order_id, data);
  }

  @Public()
  @Delete(':order_id')
  @ApiOperation({ summary: '단일 주문 삭제 API (프로덕션)' })
  async deleteAnOrder(@Param() { order_id }: DeleteOrderReqDto) {
    return await this.orderProductionService.deleteAnOrder(order_id);
  }

  /**
   * Synchronize
   */
  @Public()
  @Post('synchronize')
  @ApiOperation({ summary: '주문 데이터 동기화 (프로덕션)' })
  async synchronizeOrder() {
    return await this.orderProductionService.synchronizeOrder();
  }

  /**
   * Webhook
   */
  @Public()
  @Post('webhook-created')
  @ApiOperation({ summary: '단일 주문 생성 WEBHOOK (프로덕션)' })
  async orderCreated(@Headers() header: WebhookHeaderReqDto, @Body() data: any) {
    if (header['x-wc-webhook-topic'] !== 'order.created') return HttpStatus.NO_CONTENT;
    console.log(header);

    const result = await this.orderProductionService.orderCreated(data);

    if (result) return HttpStatus.OK;
    else return HttpStatus.BAD_REQUEST;
  }

  @Public()
  @Post('webhook-updated')
  @ApiOperation({ summary: '단일 주문 갱신 WEBHOOK (프로덕션)' })
  async orderUpdated(@Headers() header: WebhookHeaderReqDto, @Body() data: any) {
    if (header['x-wc-webhook-topic'] !== 'order.updated') return HttpStatus.NO_CONTENT;
    console.log(header);

    const result = await this.orderProductionService.orderUpdated(data);
    if (result) return HttpStatus.OK;
  }

  @Public()
  @Post('webhook-deleted')
  @ApiOperation({ summary: '단일 주문 삭제 WEBHOOK (프로덕션)' })
  async orderDeleted(@Headers() header: WebhookHeaderReqDto, @Body() data: any) {
    if (header['x-wc-webhook-topic'] !== 'order.deleted') return HttpStatus.NO_CONTENT;
    console.log(header);

    return await this.orderProductionService.orderDeleted(data);
  }

  @Public()
  @Post('webhook-restored')
  @ApiOperation({ summary: '단일 주문 복원 WEBHOOK (프로덕션)' })
  async orderRestored(@Headers() header: WebhookHeaderReqDto, @Body() data: any) {
    if (header['x-wc-webhook-topic'] !== 'order.restored') return HttpStatus.NO_CONTENT;
    console.log(header);

    return await this.orderProductionService.orderRestored(data);
  }
}
