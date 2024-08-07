import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { IOrderService } from '../interfaces/order.interface';

@Injectable()
export class OrderService implements IOrderService {
  constructor(@Inject('ORDER_SERVICE') private client: ClientProxy) {}

  async createAnOrder(payload: any): Promise<any> {
    try {
      const pattern = { cmd: 'createAnOrder' };

      return await firstValueFrom(this.client.send(pattern, payload));
    } catch (error) {
      throw error;
    }
  }

  async retrieveAnOrder(order_id: number): Promise<any> {
    try {
      const pattern = { cmd: 'retrieveAnOrder' };
      const payload = { order_id };

      return await firstValueFrom(this.client.send(pattern, payload));
    } catch (error) {
      throw error;
    }
  }

  async listAllOrders(page: number, size: number, date: string): Promise<any> {
    try {
      const pattern = { cmd: 'listAllOrders' };
      const payload = { page, size, date };

      return await firstValueFrom(this.client.send(pattern, payload));
    } catch (error) {
      throw error;
    }
  }

  async updateAnOrder(order_id: number, data: any): Promise<any> {
    try {
      const pattern = { cmd: 'updateAnOrder' };
      const payload = { order_id, data };

      return await firstValueFrom(this.client.send(pattern, payload));
    } catch (error) {
      throw error;
    }
  }

  async deleteAnOrder(order_id: number): Promise<any> {
    try {
      const pattern = { cmd: 'deleteAnOrder' };
      const payload = { order_id };

      return await firstValueFrom(this.client.send(pattern, payload));
    } catch (error) {
      throw error;
    }
  }
}
