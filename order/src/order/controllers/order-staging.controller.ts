import { Body, Controller, HttpStatus } from '@nestjs/common';
import { OrderStagingService } from '../services/order-staging.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateReqDto, DeleteReqDto, ListReqDto, RetrieveReqDto, UpdateReqDto } from '../dtos/req.dto';

@Controller()
export class OrderStagingController {
  constructor(private readonly orderStagingService: OrderStagingService) {}

  @MessagePattern({ cmd: 'createAnOrder_staging' })
  async createAnOrder(createOrderReqDto: any) {
    return await this.orderStagingService.createAnOrder(createOrderReqDto);
  }

  @MessagePattern({ cmd: 'retrieveAnOrder_staging' })
  async retrieveAnOrder({ order_id }: RetrieveReqDto) {
    return await this.orderStagingService.retrieveAnOrder(order_id);
  }

  @MessagePattern({ cmd: 'listAllOrders_staging' })
  async listAllOrders({ page, size, date }: ListReqDto) {
    return await this.orderStagingService.listAllOrders(page, size, date);
  }

  @MessagePattern({ cmd: 'updateAnOrder_staging' })
  async updateAnOrder({ order_id, data }: UpdateReqDto) {
    return await this.orderStagingService.updateAnOrder(order_id, data);
  }

  @MessagePattern({ cmd: 'deleteAnOrder_staging' })
  async deleteAnOrder({ order_id }: DeleteReqDto) {
    return await this.orderStagingService.deleteAnOrder(order_id);
  }

  @MessagePattern({ cmd: 'synchronizeOrder_staging' })
  async synchronizeOrder() {
    return await this.orderStagingService.synchronizeOrder(1);
  }

  @MessagePattern({ cmd: 'orderCreated_staging' })
  async orderCreated(payload: any) {
    return await this.orderStagingService.orderCreated(payload);
  }

  @MessagePattern({ cmd: 'orderUpdated_staging' })
  async orderUpdated(payload: any) {
    return await this.orderStagingService.orderUpdated(payload);
  }

  @MessagePattern({ cmd: 'orderDeleted_staging' })
  async orderDeleted(payload: any) {
    return await this.orderStagingService.orderDeleted(payload);
  }

  @MessagePattern({ cmd: 'orderRestored_staging' })
  async orderRestored(payload: any) {
    return await this.orderStagingService.orderRestored(payload);
  }
}
