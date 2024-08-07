import { Body, Controller, Delete, Get, Param, Post, Put, Query, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateOrderReqDto, DeleteOrderReqDto, ListAllOrdersReqDto, RetrieveOrderReqDto, UpdateOrderBodyReqDto, UpdateOrderParamReqDto } from '../dtos/req.dto';
import { OrderService } from '../services/order.service';
import { Public } from '../../common';

@ApiTags('Order')
@Controller({ path: 'api/order', version: VERSION_NEUTRAL })
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

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
}
