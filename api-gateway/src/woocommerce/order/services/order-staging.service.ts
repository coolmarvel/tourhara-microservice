import { Inject, Injectable } from '@nestjs/common';
import { IOrderService } from '../interfaces/order.interface';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export default class OrderStagingService implements IOrderService {
  constructor(@Inject('ORDER_SERVICE') private client: ClientProxy) {}

  async createAnOrder(payload: any): Promise<any> {
    const pattern = { cmd: 'createAnOrder_staging' };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async retrieveAnOrder(order_id: number): Promise<any> {
    const pattern = { cmd: 'retrieveAnOrder_staging' };
    const payload = { order_id };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async listAllOrders(page: number, size: number, date: string): Promise<any> {
    const pattern = { cmd: 'listAllOrders_staging' };
    const payload = { page, size, date };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async updateAnOrder(order_id: number, data: any): Promise<any> {
    const pattern = { cmd: 'updateAnOrder_staging' };
    const payload = { order_id, data };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async deleteAnOrder(order_id: number): Promise<any> {
    const pattern = { cmd: 'deleteAnOrder_staging' };
    const payload = { order_id };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async synchronizeOrder(): Promise<any> {
    const pattern = { cmd: 'synchronizeOrder_staging' };
    const payload = {};
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async orderCreated(payload: any): Promise<any> {
    const pattern = { cmd: 'orderCreated_staging' };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async orderUpdated(payload: any): Promise<any> {
    const pattern = { cmd: 'orderUpdated_staging' };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async orderDeleted(payload: any): Promise<any> {
    const pattern = { cmd: 'orderDeleted_staging' };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async orderRestored(payload: any): Promise<any> {
    const pattern = { cmd: 'orderRestored_staging' };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }
}
