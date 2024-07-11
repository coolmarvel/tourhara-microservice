import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { OrderService } from '../services';

@Controller()
export default class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern({ cmd: 'getOrders' })
  async getOrders({ product_id, after, before }): Promise<any> {
    return await this.orderService.getOrders(product_id, after, before);
  }
}
