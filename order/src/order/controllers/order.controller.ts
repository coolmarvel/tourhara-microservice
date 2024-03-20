import { Controller } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateReqDto, DeleteReqDto, ListReqDto, RetrieveReqDto, UpdateReqDto } from '../dtos/req.dto';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  // WooCommerce Staging Order APIs
  @MessagePattern({ cmd: 'createAnOrder_stag' })
  async createAnOrder_stag(createOrderReqDto: CreateReqDto) {
    const { payment, billing, shipping, line_items, shipping_lines } = createOrderReqDto;

    return await this.orderService.createAnOrder_stag(payment, billing, shipping, line_items, shipping_lines);
  }

  @MessagePattern({ cmd: 'retrieveAnOrder_stag' })
  async retrieveAnOrder_stag({ order_id }: RetrieveReqDto) {
    return await this.orderService.retrieveAnOrder_stag(order_id);
  }

  @MessagePattern({ cmd: 'listAllOrders_stag' })
  async listAllOrders_stag({ page, size }: ListReqDto) {
    return await this.orderService.listAllOrders_stag(page, size);
  }

  @MessagePattern({ cmd: 'updateAnOrder_stag' })
  async updateAnOrder_stag({ order_id, data }: UpdateReqDto) {
    return await this.orderService.updateAnOrder_stag(order_id, data);
  }

  @MessagePattern({ cmd: 'deleteAnOrder_stag' })
  async deleteAnOrder_stag({ order_id }: DeleteReqDto) {
    return await this.orderService.deleteAnOrder_stag(order_id);
  }

  // WooCommerce Production Order APIs
  @MessagePattern({ cmd: 'createAnOrder_prod' })
  async createAnOrder_prod(createOrderReqDto: CreateReqDto) {
    const { payment, billing, shipping, line_items, shipping_lines } = createOrderReqDto;

    return await this.orderService.createAnOrder_prod(payment, billing, shipping, line_items, shipping_lines);
  }

  @MessagePattern({ cmd: 'retrieveAnOrder_prod' })
  async retrieveAnOrder_prod({ order_id }: RetrieveReqDto) {
    return await this.orderService.retrieveAnOrder_prod(order_id);
  }

  @MessagePattern({ cmd: 'listAllOrders_prod' })
  async listAllOrders_prod({ page, size }: ListReqDto) {
    return await this.orderService.listAllOrders_prod(page, size);
  }

  @MessagePattern({ cmd: 'updateAnOrder_prod' })
  async updateAnOrder_prod({ order_id, data }: UpdateReqDto) {
    return await this.orderService.updateAnOrder_prod(order_id, data);
  }

  @MessagePattern({ cmd: 'deleteAnOrder_prod' })
  async deleteAnOrder_prod({ order_id }: DeleteReqDto) {
    return await this.orderService.deleteAnOrder_prod(order_id);
  }
  
  // --
  @MessagePattern({ cmd: 'insertOrder_prod' })
  async insertOrder_prod() {
    return await this.orderService.insertOrder_prod();
  }
}
