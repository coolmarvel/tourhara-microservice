import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

import { IRestApiService } from '../interfaces';

@Injectable()
export default class RestApiService implements IRestApiService {
  private wooCommerce: WooCommerceRestApi;

  constructor(private configService: ConfigService) {
    this.wooCommerce = new WooCommerceRestApi({
      url: this.configService.get('wc.url'),
      consumerKey: this.configService.get('wc.key'),
      consumerSecret: this.configService.get('wc.secret'),
      version: 'wc/v3',
    });
  }

  async createAnOrder(payload: any): Promise<any> {
    try {
      return await this.wooCommerce.post(`orders`, payload).then((response: any) => response.data);
    } catch (error) {
      throw error;
    }
  }

  async retrieveAnOrder(order_id: number): Promise<any> {
    try {
      return await this.wooCommerce.get(`orders/${order_id}`).then((response: any) => response.data);
    } catch (error) {
      throw error;
    }
  }

  async listAllOrders(page: number, size: number): Promise<any> {
    try {
      const params = { page, per_page: size };

      return await this.wooCommerce.get(`orders`, params).then((response: any) => response.data);
    } catch (error) {
      throw error;
    }
  }

  async updateAnOrder(order_id: number, data: any): Promise<any> {
    try {
      return await this.wooCommerce.put(`orders/${order_id}`, data).then((response: any) => response.data);
    } catch (error) {
      throw error;
    }
  }

  async deleteAnOrder(order_id: number): Promise<any> {
    try {
      return await this.wooCommerce.delete(`orders/${order_id}`).then((response: any) => response.data);
    } catch (error) {
      throw error;
    }
  }
}
