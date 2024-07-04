import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { OrderService } from '../services/order.service';
import { DeleteReqDto, ListReqDto, RetrieveReqDto, UpdateReqDto } from '../dtos/req.dto';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern({ cmd: 'createAnOrder' })
  async createAnOrder(createOrderReqDto: any) {
    return await this.orderService.createAnOrder(createOrderReqDto);
  }

  @MessagePattern({ cmd: 'retrieveAnOrder' })
  async retrieveAnOrder({ order_id }: RetrieveReqDto) {
    return await this.orderService.retrieveAnOrder(order_id);
  }

  @MessagePattern({ cmd: 'listAllOrders' })
  async listAllOrders({ page, size, date }: ListReqDto) {
    return await this.orderService.listAllOrders(page, size, date);
  }

  @MessagePattern({ cmd: 'updateAnOrder' })
  async updateAnOrder({ order_id, data }: UpdateReqDto) {
    return await this.orderService.updateAnOrder(order_id, data);
  }

  @MessagePattern({ cmd: 'deleteAnOrder' })
  async deleteAnOrder({ order_id }: DeleteReqDto) {
    return await this.orderService.deleteAnOrder(order_id);
  }

  @MessagePattern({ cmd: 'orderCreated' })
  async orderCreated(payload: any) {
    return await this.orderService.orderCreated(payload);
  }

  @MessagePattern({ cmd: 'orderUpdated' })
  async orderUpdated(payload: any) {
    return await this.orderService.orderUpdated(payload);
  }

  @MessagePattern({ cmd: 'orderDeleted' })
  async orderDeleted(payload: any) {
    return await this.orderService.orderDeleted(payload);
  }

  @MessagePattern({ cmd: 'orderRestored' })
  async orderRestored(payload: any) {
    return await this.orderService.orderRestored(payload);
  }
}
