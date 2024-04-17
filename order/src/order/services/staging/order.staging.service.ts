import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { OrderStatus } from 'src/order/constants/order-status.enum';
import { IOrderService } from 'src/order/interfaces/order.interface';
import { DataSource, QueryRunner } from 'typeorm';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { ConfigService } from '@nestjs/config';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class OrderStagingService implements IOrderService {
  private wooCommerce: WooCommerceRestApi;

  constructor(
    private configService: ConfigService,
    @InjectDataSource('staging') private dataSource: DataSource,
  ) {
    this.wooCommerce = new WooCommerceRestApi({
      url: this.configService.get('wc-stag.url'),
      consumerKey: this.configService.get('wc-stag.key'),
      consumerSecret: this.configService.get('wc-stag.secret'),
      version: 'wc/v3',
    });
  }

  async createAnOrder(payload: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const order = await this.wooCommerce
          .post(`orders`, payload)
          .then((response: any) => response.data)
          .catch((error: any) => error.response.data);

        return resolve(order);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async retrieveAnOrder(order_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const order = await this.wooCommerce
          .get(`orders/${order_id}`)
          .then((response: any) => response.data)
          .catch((error: any) => error.response.data);

        return resolve(order);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async listAllOrders(page: number, size: number, date: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const beforeDate = new Date(date);
        beforeDate.setDate(beforeDate.getDate() + 1);

        const params = {
          page,
          per_page: size,
          after: `${date}T00:00:00`,
          before: `${beforeDate.toISOString().split('T')[0]}T00:00:00`,
        };
        const orders = await this.wooCommerce.get('orders', params).then((response: any) => {
          if (response && response.data) return response.data;
        });

        return resolve(orders);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async updateAnOrder(order_id: number, data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const order = await this.wooCommerce
          .put(`orders/${order_id}`, data)
          .then((response: any) => response.data)
          .catch((error: any) => error.response.data);

        return resolve(order);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async deleteAnOrder(order_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const order = await this.wooCommerce
          .put(`orders/${order_id}`, { force: true })
          .then((response: any) => response.data)
          .catch((error: any) => error.response.data);

        return resolve(order);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async insert(queryRunner: QueryRunner, order: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingOrder = await queryRunner.manager.query(`
        SELECT order_id FROM \`order\` WHERE id=${order.id};`);
        if (existingOrder.length > 0) return resolve(true);

        const orderId = uuid();
        await queryRunner.manager.query(`
        INSERT INTO \`order\` (
          order_id, id, status, currency, currency_symbol, date_created, date_created_gmt,
          date_modified, date_modified_gmt, date_completed, date_completed_gmt, created_at, updated_at
        ) VALUES (
          '${orderId}',
          ${order.id},
          '${OrderStatus[order.status.toUpperCase() as keyof typeof OrderStatus]}',
          '${order.currency}',
          '${order.currency_symbol}',
          ${order.date_created === null ? null : `'${order.date_created}'`},
          ${order.date_created_gmt === null ? null : `'${order.date_created_gmt}'`},
          ${order.date_modified === null ? null : `'${order.date_modified}'`},
          ${order.date_modified_gmt === null ? null : `'${order.date_modified_gmt}'`},
          ${order.date_completed === null ? null : `'${order.date_completed}'`},
          ${order.date_completed_gmt === null ? null : `'${order.date_completed_gmt}'`},
          NOW(), NOW()
        );`);

        return resolve(orderId);
      } catch (error) {
        console.error('Order Service Insert Error');
        console.error(error);
        return reject(error);
      }
    });
  }

  async orderCreated(payload: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(payload);
        
        return resolve(true);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async orderUpdated(payload: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        return resolve(true);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async orderDeleted(payload: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        return resolve(true);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async orderRestored(payload: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        return resolve(true);
      } catch (error) {
        return reject(error);
      }
    });
  }
}
