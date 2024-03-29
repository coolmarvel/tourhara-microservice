import { Inject, Injectable } from '@nestjs/common';
import { IOrderService } from '../interfaces/order.interface';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrderProductionService implements IOrderService {
  constructor(@Inject('ORDER_SERVICE') private client: ClientProxy) {}

  async createAnOrder(payload: any): Promise<any> {
    const pattern = { cmd: 'createAnOrder_production' };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async retrieveAnOrder(order_id: number): Promise<any> {
    const pattern = { cmd: 'retrieveAnOrder_production' };
    const payload = { order_id };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async listAllOrders(page: number, size: number): Promise<any> {
    const pattern = { cmd: 'listAllOrders_production' };
    const payload = { page, size };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async updateAnOrder(order_id: number, data: any): Promise<any> {
    const pattern = { cmd: 'updateAnOrder_production' };
    const payload = { order_id, data };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async deleteAnOrder(order_id: number): Promise<any> {
    const pattern = { cmd: 'deleteAnOrder_production' };
    const payload = { order_id };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async synchronizeOrder(): Promise<any> {
    const pattern = { cmd: 'synchronizeOrder_production' };
    const payload = {};
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async orderCreated(payload: any): Promise<any> {
    const pattern = { cmd: 'orderCreated_production' };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async orderUpdated(payload: any): Promise<any> {
    const pattern = { cmd: 'orderUpdated_production' };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async orderDeleted(payload: any): Promise<any> {
    const pattern = { cmd: 'orderDeleted_production' };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async orderRestored(payload: any): Promise<any> {
    const pattern = { cmd: 'orderRestored_production' };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }
}
