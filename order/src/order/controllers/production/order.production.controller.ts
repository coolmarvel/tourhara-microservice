import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { DeleteReqDto, ListReqDto, RetrieveReqDto, UpdateReqDto } from 'src/order/dtos/req.dto';
import { OrderProductionService } from 'src/order/services/production/order.production.service';

@Controller()
export class OrderProductionController {
  constructor(private readonly orderService: OrderProductionService) {}

  @MessagePattern({ cmd: 'createAnOrder_production' })
  async createAnOrder(createOrderReqDto: any) {
    return await this.orderService.createAnOrder(createOrderReqDto);
  }

  @MessagePattern({ cmd: 'retrieveAnOrder_production' })
  async retrieveAnOrder({ order_id }: RetrieveReqDto) {
    return await this.orderService.retrieveAnOrder(order_id);
  }

  @MessagePattern({ cmd: 'listAllOrders_production' })
  async listAllOrders({ page, size, date }: ListReqDto) {
    return await this.orderService.listAllOrders(page, size, date);
  }

  @MessagePattern({ cmd: 'updateAnOrder_production' })
  async updateAnOrder({ order_id, data }: UpdateReqDto) {
    return await this.orderService.updateAnOrder(order_id, data);
  }

  @MessagePattern({ cmd: 'deleteAnOrder_production' })
  async deleteAnOrder({ order_id }: DeleteReqDto) {
    return await this.orderService.deleteAnOrder(order_id);
  }

  @MessagePattern({ cmd: 'orderCreated_production' })
  async orderCreated(payload: any) {
    return await this.orderService.orderCreated(payload);
  }

  @MessagePattern({ cmd: 'orderUpdated_production' })
  async orderUpdated(payload: any) {
    return await this.orderService.orderUpdated(payload);
  }

  @MessagePattern({ cmd: 'orderDeleted_production' })
  async orderDeleted(payload: any) {
    return await this.orderService.orderDeleted(payload);
  }

  @MessagePattern({ cmd: 'orderRestored_production' })
  async orderRestored(payload: any) {
    return await this.orderService.orderRestored(payload);
  }
}
