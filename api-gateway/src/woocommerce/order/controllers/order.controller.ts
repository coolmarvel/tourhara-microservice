import { Body, Controller, Delete, Get, Param, Post, Put, Query, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrderService } from '../services/order.service';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateOrderReqDto, DeleteOrderReqDto, RetrieveOrderReqDto, UpdateOrderBodyReqDto, UpdateOrderParamReqDto } from '../dtos/req.dto';
import { PageReqDto } from 'src/common/dtos/req.dto';

@ApiTags('Order')
@ApiExtraModels()
@Controller({ path: 'api/order', version: VERSION_NEUTRAL })
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // WooCommerce Staging Order APIs
  @Public()
  @Post('stag')
  @ApiOperation({ summary: '단일 주문 생성 API (스테이징)' })
  async createAnOrder_stag(@Body() data: CreateOrderReqDto) {
    return await this.orderService.createAnOrder_stag(data);
  }

  @Public()
  @Get('stag/:order_id')
  @ApiOperation({ summary: '단일 주문 조회 API (스테이징)' })
  async retrieveAnOrder_stag(@Param() { order_id }: RetrieveOrderReqDto) {
    return await this.orderService.retrieveAnOrder_stag(order_id);
  }

  @Public()
  @Get('stag')
  @ApiOperation({ summary: '주문 리스트 조회 API (스테이징)' })
  async listAllOrders_stag(@Query() { page, size }: PageReqDto) {
    return await this.orderService.listAllOrders_stag(page, size);
  }

  @Public()
  @Put('stag/:order_id')
  @ApiOperation({ summary: '단일 주문 갱신 API (스테이징)' })
  async updateAnOrder_stag(@Param() { order_id }: UpdateOrderParamReqDto, @Body() data: UpdateOrderBodyReqDto) {
    return await this.orderService.updateAnOrder_stag(order_id, data);
  }

  @Public()
  @Delete('stag/:order_id')
  @ApiOperation({ summary: '단일 주문 삭제 API (스테이징)' })
  async deleteAnOrder_stag(@Param() { order_id }: DeleteOrderReqDto) {
    return await this.orderService.deleteAnOrder_stag(order_id);
  }

  // WooCommerce Production Order APIs
  @Public()
  @Post('prod')
  @ApiOperation({ summary: '단일 주문 생성 API (프로덕션)' })
  async createAnOrder_prod(@Body() data: CreateOrderReqDto) {
    return await this.orderService.createAnOrder_prod(data);
  }

  @Public()
  @Get('prod/:order_id')
  @ApiOperation({ summary: '단일 주문 조회 API (프로덕션)' })
  async retrieveAnOrder_prod(@Param() { order_id }: RetrieveOrderReqDto) {
    return await this.orderService.retrieveAnOrder_prod(order_id);
  }

  @Public()
  @Get('prod')
  @ApiOperation({ summary: '주문 리스트 조회 API (프로덕션)' })
  async listAllOrders_prod(@Query() { page, size }: PageReqDto) {
    return await this.orderService.listAllOrders_prod(page, size);
  }

  @Public()
  @Put('prod/:order_id')
  @ApiOperation({ summary: '단일 주문 갱신 API (프로덕션)' })
  async updateAnOrder_prod(@Param() { order_id }: UpdateOrderParamReqDto, @Body() data: UpdateOrderBodyReqDto) {
    return await this.orderService.updateAnOrder_prod(order_id, data);
  }

  @Public()
  @Delete('prod/:order_id')
  @ApiOperation({ summary: '단일 주문 삭제 API (프로덕션)' })
  async deleteAnOrder_prod(@Param() { order_id }: DeleteOrderReqDto) {
    return await this.orderService.deleteAnOrder_prod(order_id);
  }

  // --
  @Public()
  @Post('prod/insert-database')
  @ApiTags('Database-Order')
  async insertOrder_prod() {
    return await this.orderService.insertOrder_prod();
  }
}
