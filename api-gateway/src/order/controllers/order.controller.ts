import { Controller, Delete, Get, Post, Put, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrderService } from '../services/order.service';
import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('Order')
@ApiExtraModels()
@Controller({ path: 'api/order', version: VERSION_NEUTRAL })
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Public()
  @Post('stag')
  @ApiOperation({ summary: '단일 주문 생성 API (스테이징)' })
  async createAnOrder_stag(payment: object, billing: object, shipping: object, line_items: object, shipping_lines: object) {
    return await this.orderService.createAnOrder_stag(payment, billing, shipping, line_items, shipping_lines);
  }

  @Public()
  @Get('stag/:id')
  @ApiOperation({ summary: '단일 주문 조회 API (스테이징)' })
  async retrieveAnOrder_stag(order_id: string) {
    return await this.orderService.retrieveAnOrder_stag(order_id);
  }

  @Public()
  @Get('stag')
  @ApiOperation({ summary: '주문 리스트 조회 API (스테이징)' })
  async listAllOrders_stag(page: number, size: number) {
    return await this.orderService.listAllOrders_stag(page, size);
  }

  @Public()
  @Put('stag/:id')
  @ApiOperation({ summary: '단일 주문 갱신 API (스테이징)' })
  async updateAnOrder_stag(order_id: string) {
    return await this.orderService.updateAnOrder_stag(order_id);
  }

  @Public()
  @Delete('stag/:id')
  @ApiOperation({ summary: '단일 주문 삭제 API (스테이징)' })
  async deleteAnOrder_stag(order_id: string) {
    return await this.orderService.deleteAnOrder_stag(order_id);
  }

  async createAnOrder_prod() {}

  async retrieveAnOrder_prod() {}

  async listAllOrders_prod() {}

  async updateAnOrder_prod() {}

  async deleteAnOrder_prod() {}
}
