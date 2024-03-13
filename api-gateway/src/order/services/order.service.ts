import { Inject, Injectable } from '@nestjs/common';
import { IOrderService } from '../interfaces/order.interface';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrderService implements IOrderService {
  constructor(@Inject('ORDER_SERVICE') private client: ClientProxy) {}

  // WooCommerce Staging Order APIs
  async createAnOrder_stag(payment: object, billing: object, shipping: object, line_items: object, shipping_lines: object): Promise<any> {
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

  async updateAnOrder_stag(order_id: string): Promise<any> {
    const pattern = { cmd: 'updateAnOrder_stag' };
    const payload = { order_id };
    await firstValueFrom(this.client.send(pattern, payload));
  }

  async deleteAnOrder_stag(order_id: string): Promise<any> {
    const pattern = { cmd: 'deleteAnOrder_stag' };
    const payload = { order_id };
    await firstValueFrom(this.client.send(pattern, payload));
  }

  // WooCommerce Production Order APIs
  async createAnOrder_prod(payment: object, billing: object, shipping: object, line_items: object, shipping_lines: object): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async retrieveAnOrder_prod(order_id: string): Promise<any> {
    const pattern = { cmd: 'retrieveAnOrder_prod' };
    const payload = { order_id };
    const order = await firstValueFrom(this.client.send(pattern, payload));

    return order;
  }

  async listAllOrders_prod(page: number, size: number): Promise<any> {
    const pattern = { cmd: 'listAllOrders_prod' };
    const payload = { page, size };
    const orders = await firstValueFrom(this.client.send(pattern, payload));

    return orders;
  }

  async updateAnOrder_prod(order_id: string): Promise<any> {
    const pattern = { cmd: 'updateAnOrder_prod' };
    const payload = { order_id };
    await firstValueFrom(this.client.send(pattern, payload));
  }

  async deleteAnOrder_prod(order_id: string): Promise<any> {
    const pattern = { cmd: 'deleteAnOrder_prod' };
    const payload = { order_id };
    await firstValueFrom(this.client.send(pattern, payload));
  }
}
