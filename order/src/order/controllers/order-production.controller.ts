import { Controller } from '@nestjs/common';
import { OrderProductionService } from '../services/order-production.service';
import { MessagePattern } from '@nestjs/microservices';
import { DeleteReqDto, ListReqDto, RetrieveReqDto, UpdateReqDto } from '../dtos/req.dto';

@Controller()
export class OrderProductionController {
  constructor(private readonly orderProductionService: OrderProductionService) {}

  @MessagePattern({ cmd: 'createAnOrder_production' })
  async createAnOrder(createOrderReqDto: any) {
    return await this.orderProductionService.createAnOrder(createOrderReqDto);
  }

  @MessagePattern({ cmd: 'retrieveAnOrder_production' })
  async retrieveAnOrder({ order_id }: RetrieveReqDto) {
    return await this.orderProductionService.retrieveAnOrder(order_id);
  }

  @MessagePattern({ cmd: 'listAllOrders_production' })
  async listAllOrders({ page, size }: ListReqDto) {
    return await this.orderProductionService.listAllOrders(page, size);
  }

  @MessagePattern({ cmd: 'updateAnOrder_production' })
  async updateAnOrder({ order_id, data }: UpdateReqDto) {
    return await this.orderProductionService.updateAnOrder(order_id, data);
  }

  @MessagePattern({ cmd: 'deleteAnOrder_production' })
  async deleteAnOrder({ order_id }: DeleteReqDto) {
    return await this.orderProductionService.deleteAnOrder(order_id);
  }

  @MessagePattern({ cmd: 'synchronizeOrder_production' })
  async synchronizeOrder() {
    return await this.orderProductionService.synchronizeOrder();
  }

  @MessagePattern({ cmd: 'orderCreated_production' })
  async orderCreated(payload: any) {
    return await this.orderProductionService.orderCreated(payload);
  }

  @MessagePattern({ cmd: 'orderUpdated_production' })
  async orderUpdated(payload: any) {
    return await this.orderProductionService.orderUpdated(payload);
  }

  @MessagePattern({ cmd: 'orderDeleted_production' })
  async orderDeleted(payload: any) {
    return await this.orderProductionService.orderDeleted(payload);
  }

  @MessagePattern({ cmd: 'orderRestored_production' })
  async orderRestored(payload: any) {
    return await this.orderProductionService.orderRestored(payload);
  }
}
