import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { DeleteReqDto, ListReqDto, RetrieveReqDto, UpdateReqDto } from '../dtos';
import { RestApiService, WebhookService } from '../services';

@Controller()
export default class OrderController {
  constructor(
    private readonly restApiService: RestApiService,
    private readonly webhookService: WebhookService,
  ) {}

  @MessagePattern({ cmd: 'createAnOrder' })
  async createAnOrder(createOrderReqDto: any) {
    return await this.restApiService.createAnOrder(createOrderReqDto);
  }

  @MessagePattern({ cmd: 'retrieveAnOrder' })
  async retrieveAnOrder({ order_id }: RetrieveReqDto) {
    return await this.restApiService.retrieveAnOrder(order_id);
  }

  @MessagePattern({ cmd: 'listAllOrders' })
  async listAllOrders({ page, size }: ListReqDto) {
    return await this.restApiService.listAllOrders(page, size);
  }

  @MessagePattern({ cmd: 'updateAnOrder' })
  async updateAnOrder({ order_id, data }: UpdateReqDto) {
    return await this.restApiService.updateAnOrder(order_id, data);
  }

  @MessagePattern({ cmd: 'deleteAnOrder' })
  async deleteAnOrder({ order_id }: DeleteReqDto) {
    return await this.restApiService.deleteAnOrder(order_id);
  }

  @MessagePattern({ cmd: 'orderCreated' })
  async orderCreated(payload: any) {
    return await this.webhookService.orderCreated(payload);
  }

  @MessagePattern({ cmd: 'orderUpdated' })
  async orderUpdated(payload: any) {
    return await this.webhookService.orderUpdated(payload);
  }

  @MessagePattern({ cmd: 'orderDeleted' })
  async orderDeleted(payload: any) {
    return await this.webhookService.orderDeleted(payload);
  }

  @MessagePattern({ cmd: 'orderRestored' })
  async orderRestored(payload: any) {
    return await this.webhookService.orderRestored(payload);
  }
}
