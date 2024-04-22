import { Body, Controller, Delete, Get, Param, Post, Put, Headers, Query, VERSION_NEUTRAL, HttpStatus, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import OrderStagingService from '../../services/staging/order.staging.service';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateOrderReqDto, DeleteOrderReqDto, ListAllOrdersReqDto, RetrieveOrderReqDto, SynchronizeOrdereReqDto, UpdateOrderBodyReqDto, UpdateOrderParamReqDto } from '../../dtos/req.dto';
import { WebhookHeaderReqDto } from 'src/product/dtos/webhook-req.dto';
import { Response } from 'express';

@ApiTags('(Staging) Order')
@Controller({ path: 'api/staging/order', version: VERSION_NEUTRAL })
export class OrderStagingController {
  constructor(private readonly orderStagingService: OrderStagingService) {}

  /**
   * WooCommerce
   */
  @Public()
  @Post()
  @ApiOperation({ summary: '단일 주문 생성 API (스테이징)' })
  async createAnOrder(@Body() data: CreateOrderReqDto) {
    return await this.orderStagingService.createAnOrder(data);
  }

  @Public()
  @Get(':order_id')
  @ApiOperation({ summary: '단일 주문 조회 API (스테이징)' })
  async retrieveAnOrder(@Param() { order_id }: RetrieveOrderReqDto) {
    return await this.orderStagingService.retrieveAnOrder(order_id);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: '주문 리스트 조회 API (스테이징)' })
  async listAllOrders(@Query() { page, size }: ListAllOrdersReqDto) {
    return await this.orderStagingService.listAllOrders(page, size);
  }

  @Public()
  @Put(':order_id')
  @ApiOperation({ summary: '단일 주문 갱신 API (스테이징)' })
  async updateAnOrder(@Param() { order_id }: UpdateOrderParamReqDto, @Body() data: UpdateOrderBodyReqDto) {
    return await this.orderStagingService.updateAnOrder(order_id, data);
  }

  @Public()
  @Delete(':order_id')
  @ApiOperation({ summary: '단일 주문 삭제 API (스테이징)' })
  async deleteAnOrder(@Param() { order_id }: DeleteOrderReqDto) {
    return await this.orderStagingService.deleteAnOrder(order_id);
  }

  /**
   * Webhook
   */
  @Public()
  @Post('created')
  @ApiOperation({ summary: '단일 주문 생성 WEBHOOK (스테이징)' })
  async orderCreated(@Headers() header: WebhookHeaderReqDto, @Body() data: any, @Res() response: Response) {
    if (header['x-wc-webhook-topic'] !== 'order.created') return response.status(HttpStatus.OK).send();

    const result = await this.orderStagingService.orderCreated(data);

    if (result) response.status(HttpStatus.OK).send();
    else return response.status(HttpStatus.BAD_REQUEST).send();
  }

  @Public()
  @Post('updated')
  @ApiOperation({ summary: '단일 주문 갱신 WEBHOOK (스테이징)' })
  async orderUpdated(@Headers() header: WebhookHeaderReqDto, @Body() data: any, @Res() response: Response) {
    if (header['x-wc-webhook-topic'] !== 'order.updated') response.status(HttpStatus.OK).send();

    const result = await this.orderStagingService.orderUpdated(data);
    if (result) response.status(HttpStatus.OK).send();
    else return response.status(HttpStatus.BAD_REQUEST).send();
  }

  @Public()
  @Post('deleted')
  @ApiOperation({ summary: '단일 주문 삭제 WEBHOOK (스테이징)' })
  async orderDeleted(@Headers() header: WebhookHeaderReqDto, @Body() data: any, @Res() response: Response) {
    if (header['x-wc-webhook-topic'] !== 'order.deleted') response.status(HttpStatus.OK).send();

    const result = await this.orderStagingService.orderDeleted(data);
    if (result) response.status(HttpStatus.OK).send();
    else return response.status(HttpStatus.BAD_REQUEST).send();
  }

  @Public()
  @Post('restored')
  @ApiOperation({ summary: '단일 주문 복원 WEBHOOK (스테이징)' })
  async orderRestored(@Headers() header: WebhookHeaderReqDto, @Body() data: any, @Res() response: Response) {
    if (header['x-wc-webhook-topic'] !== 'order.restored') response.status(HttpStatus.OK).send();

    const result = await this.orderStagingService.orderRestored(data);
    if (result) response.status(HttpStatus.OK).send();
    else return response.status(HttpStatus.BAD_REQUEST).send();
  }
}
