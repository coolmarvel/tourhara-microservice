import { Body, Controller, Delete, Get, Headers, HttpStatus, Param, Post, Put, Query, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { OrderService } from '../services/order.service';
import { CreateOrderReqDto, DeleteOrderReqDto, ListAllOrdersReqDto, RetrieveOrderReqDto, UpdateOrderBodyReqDto, UpdateOrderParamReqDto } from '../dtos/req.dto';
import { Public } from '../../common';

@ApiTags('Order')
@Controller({ path: 'api/order', version: VERSION_NEUTRAL })
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  /**
   * WooCommerce
   */
  @Public()
  @Post()
  @ApiOperation({ summary: '단일 주문 생성 API' })
  async createAnOrder(@Body() data: CreateOrderReqDto) {
    return await this.orderService.createAnOrder(data);
  }

  @Public()
  @Get(':order_id')
  @ApiOperation({ summary: '단일 주문 조회 API' })
  async retrieveAnOrder(@Param() { order_id }: RetrieveOrderReqDto) {
    return await this.orderService.retrieveAnOrder(order_id);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: '주문 리스트 조회 API' })
  async listAllOrders(@Query() { page, size, date }: ListAllOrdersReqDto) {
    return await this.orderService.listAllOrders(page, size, date);
  }

  @Public()
  @Put(':order_id')
  @ApiOperation({ summary: '단일 주문 갱신 API' })
  async updateAnOrder(@Param() { order_id }: UpdateOrderParamReqDto, @Body() data: UpdateOrderBodyReqDto) {
    return await this.orderService.updateAnOrder(order_id, data);
  }

  @Public()
  @Delete(':order_id')
  @ApiOperation({ summary: '단일 주문 삭제 API' })
  async deleteAnOrder(@Param() { order_id }: DeleteOrderReqDto) {
    return await this.orderService.deleteAnOrder(order_id);
  }

  /**
   * Webhook
   */
  @Public()
  @Post('created')
  @ApiOperation({ summary: '단일 주문 생성 WEBHOOK' })
  async orderCreated(@Headers() header: any, @Body() data: any) {
    if (header['x-wc-webhook-topic'] !== 'order.created') return HttpStatus.NO_CONTENT;
    console.log(header);

    const result = await this.orderService.orderCreated(data);

    if (result) return HttpStatus.OK;
    else return HttpStatus.BAD_REQUEST;
  }

  @Public()
  @Post('updated')
  @ApiOperation({ summary: '단일 주문 갱신 WEBHOOK' })
  async orderUpdated(@Headers() header: any, @Body() data: any) {
    if (header['x-wc-webhook-topic'] !== 'order.updated') return HttpStatus.NO_CONTENT;
    console.log(header);

    const result = await this.orderService.orderUpdated(data);
    if (result) return HttpStatus.OK;
  }

  @Public()
  @Post('deleted')
  @ApiOperation({ summary: '단일 주문 삭제 WEBHOOK' })
  async orderDeleted(@Headers() header: any, @Body() data: any) {
    if (header['x-wc-webhook-topic'] !== 'order.deleted') return HttpStatus.NO_CONTENT;
    console.log(header);

    return await this.orderService.orderDeleted(data);
  }

  @Public()
  @Post('restored')
  @ApiOperation({ summary: '단일 주문 복원 WEBHOOK' })
  async orderRestored(@Headers() header: any, @Body() data: any) {
    if (header['x-wc-webhook-topic'] !== 'order.restored') return HttpStatus.NO_CONTENT;
    console.log(header);

    return await this.orderService.orderRestored(data);
  }
}
