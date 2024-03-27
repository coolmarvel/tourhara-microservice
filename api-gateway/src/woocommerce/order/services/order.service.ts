import { Inject, Injectable } from '@nestjs/common';
import { IOrderService } from '../interfaces/order.interface';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateOrderReqDto } from '../dtos/req.dto';

@Injectable()
export class OrderService implements IOrderService {
  constructor(@Inject('ORDER_SERVICE') private client: ClientProxy) {}

  // WooCommerce Staging Order APIs
  async createAnOrder_stag(data: CreateOrderReqDto): Promise<any> {
    const pattern = { cmd: 'createAnOrder_stag' };
    const payload = data;
    const order = await firstValueFrom(this.client.send(pattern, payload));

    return order;
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

  async updateAnOrder_stag(order_id: string, data: any): Promise<any> {
    const pattern = { cmd: 'updateAnOrder_stag' };
    const payload = { order_id, data };
    await firstValueFrom(this.client.send(pattern, payload));
  }

  async deleteAnOrder_stag(order_id: string): Promise<any> {
    const pattern = { cmd: 'deleteAnOrder_stag' };
    const payload = { order_id };
    await firstValueFrom(this.client.send(pattern, payload));
  }

  // WooCommerce Production Order APIs
  async createAnOrder_prod(data: CreateOrderReqDto): Promise<any> {
    const pattern = { cmd: 'createAnOrder_prod' };
    const payload = data;
    const order = await firstValueFrom(this.client.send(pattern, payload));

    return order;
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

  async updateAnOrder_prod(order_id: string, data: any): Promise<any> {
    const pattern = { cmd: 'updateAnOrder_prod' };
    const payload = { order_id, data };
    await firstValueFrom(this.client.send(pattern, payload));
  }

  async deleteAnOrder_prod(order_id: string): Promise<any> {
    const pattern = { cmd: 'deleteAnOrder_prod' };
    const payload = { order_id };
    await firstValueFrom(this.client.send(pattern, payload));
  }

  // --
  async insertOrder_prod(): Promise<any> {
    const pattern = { cmd: 'insertOrder_prod' };
    const payload = {};
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }
}
