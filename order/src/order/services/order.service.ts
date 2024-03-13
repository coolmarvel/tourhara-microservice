import { Injectable } from '@nestjs/common';
import { IOrderService } from '../interfaces/order.interface';

import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OrderService implements IOrderService {
  private wooCommerceStag: WooCommerceRestApi;
  private wooCommerceProd: WooCommerceRestApi;

  constructor(private configService: ConfigService) {
    this.wooCommerceStag = new WooCommerceRestApi({
      url: this.configService.get('wc-prod.url'),
      consumerKey: this.configService.get('wc-prod.key'),
      consumerSecret: this.configService.get('wc-prod.secret'),
      version: 'wc/v3',
    });

    this.wooCommerceProd = new WooCommerceRestApi({
      url: this.configService.get('wc-prod.url'),
      consumerKey: this.configService.get('wc-prod.key'),
      consumerSecret: this.configService.get('wc-prod.secret'),
      version: 'wc/v3',
    });
  }

  async createAnOrder_stag(payment: object, billing: object, shipping: object, line_items: object, shipping_lines: object): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async retrieveAnOrder_stag(order_id: string): Promise<any> {
    const order = await this.wooCommerceStag
      .get(`orders/${order_id}`)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return order;
  }

  async listAllOrders_stag(page: number, size: number): Promise<any> {
    const params = { page, per_page: size };
    const orders = await this.wooCommerceStag
      .get('orders', params)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return orders;
  }

  async updateAnOrder_stag(order_id: string, data: any): Promise<any> {
    const order = await this.wooCommerceStag
      .put(`orders/${order_id}`, data)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return order;
  }

  async deleteAnOrder_stag(order_id: string): Promise<any> {
    const order = await this.wooCommerceStag
      .put(`orders/${order_id}`, { force: true })
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return order;
  }

  createAnOrder_prod(payment: object, billing: object, shipping: object, line_items: object, shipping_lines: object): Promise<any> {
    throw new Error('Method not implemented.');
  }

  retrieveAnOrder_prod(order_id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  listAllOrders_prod(page: number, size: number): Promise<any> {
    throw new Error('Method not implemented.');
  }

  updateAnOrder_prod(order_id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  deleteAnOrder_prod(order_id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
