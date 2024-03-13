import { Inject, Injectable } from '@nestjs/common';
import { IOrderService } from '../interfaces/order.interface';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrderService implements IOrderService {
  constructor(@Inject('ORDER_SERVICE') private client: ClientProxy) {}

  async createAnOrder_stag(payment: object, billing: object, shipping: object, line_items: object, shipping_lines: object): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async retrieveAnOrder_stag(order_id: string) {
    const pattern = { cmd: 'retrieveAnOrder_stag' };
    const payload = { order_id };
    const order = await firstValueFrom(this.client.send(pattern, payload));

    return order;
  }

  async listAllOrders_stag(page: number, size: number) {
    const pattern = { cmd: 'listAllOrders_stag' };
    const payload = { page, size };
    const orders = await firstValueFrom(this.client.send(pattern, payload));

    return orders;
  }

  async updateAnOrder_stag(order_id: string): Promise<void> {
    const pattern = { cmd: 'updateAnOrder_stag' };
    const payload = { order_id };
    await firstValueFrom(this.client.send(pattern, payload));
  }

  async deleteAnOrder_stag(order_id: string): Promise<void> {
    const pattern = { cmd: 'deleteAnOrder_stag' };
    const payload = { order_id };
    await firstValueFrom(this.client.send(pattern, payload));
  }

  createAnOrder_prod(payment: object, billing: object, shipping: object, line_items: object, shipping_lines: object): Promise<void> {
    throw new Error('Method not implemented.');
  }

  retrieveAnOrder_prod(order_id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  listAllOrders_prod(page: number, size: number): Promise<any> {
    throw new Error('Method not implemented.');
  }

  updateAnOrder_prod(order_id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  deleteAnOrder_prod(order_id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
