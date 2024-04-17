import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { DeleteReqDto, ListReqDto, RetrieveReqDto, UpdateReqDto } from 'src/order/dtos/req.dto';
import { OrderStagingService } from 'src/order/services/staging/order.staging.service';

@Controller()
export class OrderStagingController {
  constructor(private readonly orderService: OrderStagingService) {}

  @MessagePattern({ cmd: 'createAnOrder_staging' })
  async createAnOrder(createOrderReqDto: any) {
    return await this.orderService.createAnOrder(createOrderReqDto);
  }

  @MessagePattern({ cmd: 'retrieveAnOrder_staging' })
  async retrieveAnOrder({ order_id }: RetrieveReqDto) {
    return await this.orderService.retrieveAnOrder(order_id);
  }

  @MessagePattern({ cmd: 'listAllOrders_staging' })
  async listAllOrders({ page, size, date }: ListReqDto) {
    return await this.orderService.listAllOrders(page, size, date);
  }

  @MessagePattern({ cmd: 'updateAnOrder_staging' })
  async updateAnOrder({ order_id, data }: UpdateReqDto) {
    return await this.orderService.updateAnOrder(order_id, data);
  }

  @MessagePattern({ cmd: 'deleteAnOrder_staging' })
  async deleteAnOrder({ order_id }: DeleteReqDto) {
    return await this.orderService.deleteAnOrder(order_id);
  }

  @MessagePattern({ cmd: 'orderCreated_staging' })
  async orderCreated(payload: any) {
    return await this.orderService.orderCreated(payload);
  }

  @MessagePattern({ cmd: 'orderUpdated_staging' })
  async orderUpdated(payload: any) {
    return await this.orderService.orderUpdated(payload);
  }

  @MessagePattern({ cmd: 'orderDeleted_staging' })
  async orderDeleted(payload: any) {
    return await this.orderService.orderDeleted(payload);
  }

  @MessagePattern({ cmd: 'orderRestored_staging' })
  async orderRestored(payload: any) {
    return await this.orderService.orderRestored(payload);
  }
}
