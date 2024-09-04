import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { IAdapterService } from '../interfaces/adapter.interface';

@Injectable()
export class AdapterService implements IAdapterService {
  constructor(@Inject('ADAPTER_SERVICE') private client: ClientProxy) {}

  async getOrders(product_id: string, after: string, before: string): Promise<any> {
    try {
      const pattern = { cmd: 'getOrders' };
      const payload = { product_id, after, before };

      return await firstValueFrom(this.client.send(pattern, payload));
    } catch (error) {
      throw error;
    }
  }

  async updateOrder(order_id: string, double_check?: boolean, memo?: string): Promise<any> {
    try {
      const pattern = { cmd: 'updateOrder' };
      const payload = { order_id, double_check, memo };

      return await firstValueFrom(this.client.send(pattern, payload));
    } catch (error) {
      throw error;
    }
  }
}
