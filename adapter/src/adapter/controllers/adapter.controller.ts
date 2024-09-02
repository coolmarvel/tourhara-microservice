import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { AdapterService } from '../services';

@Controller()
export default class AdapterController {
  constructor(private readonly adapterService: AdapterService) {}

  @MessagePattern({ cmd: 'getOrders' })
  async getOrders({ product_id, after, before }): Promise<any> {
    return await this.adapterService.getOrders(product_id, after, before);
  }
}
