import { Injectable } from '@nestjs/common';
import { IOrderService } from '../interfaces/order.interface';

import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

@Injectable()
export class OrderService implements IOrderService {
  private wooCommerceStag: WooCommerceRestApi;
  private wooCommerceProd: WooCommerceRestApi;

  constructor(
    private dataSource: DataSource,
    private configService: ConfigService,
  ) {
    this.wooCommerceStag = new WooCommerceRestApi({
      url: this.configService.get('wc-stag.url'),
      consumerKey: this.configService.get('wc-stag.key'),
      consumerSecret: this.configService.get('wc-stag.secret'),
      version: 'wc/v3',
    });

    this.wooCommerceProd = new WooCommerceRestApi({
      url: this.configService.get('wc-prod.url'),
      consumerKey: this.configService.get('wc-prod.key'),
      consumerSecret: this.configService.get('wc-prod.secret'),
      version: 'wc/v3',
    });
  }

  // WooCommerce Staging Order APIs
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

  // WooCommerce Production Order APIs
  async createAnOrder_prod(payment: object, billing: object, shipping: object, line_items: object, shipping_lines: object): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async retrieveAnOrder_prod(order_id: string): Promise<any> {
    const order = await this.wooCommerceProd
      .get(`orders/${order_id}`)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    // const queryRunner = this.dataSource.createQueryRunner();
    // await queryRunner.connect();
    // await queryRunner.startTransaction();

    // try {
    //   const exist = await queryRunner.manager.findOneBy(Order, { id: Number(order_id) });
    //   if (exist === null) {
    //     // Billing entity
    //     const billingEntity = queryRunner.manager.create(Billing, {
    //       firstName: order.billing.first_name,
    //       email: order.billing.email,
    //       phone: order.billing.phone,
    //       survey: order.billing.survey,
    //     });
    //     await queryRunner.manager.save(billingEntity);

    //     // Shipping entity
    //     const shippingEntity = queryRunner.manager.create(Shipping, {
    //       firstName: order.shipping.first_name,
    //     });
    //     await queryRunner.manager.save(shippingEntity);

    //     // Order entity
    //     const orderEntity = queryRunner.manager.create(Order, {
    //       id: order.id,
    //       status: order.status,
    //       currency: order.currency,
    //       dateCreated: new Date(order.date_created),
    //       dateModified: new Date(order.date_modified),
    //       dateCompleted: order.date_completed ? new Date(order.date_completed) : null,
    //       datePaid: order.date_paid ? new Date(order.date_paid) : null,
    //       billingId: billingEntity.billingId,
    //       shippingId: shippingEntity.shippingId,
    //       paymentMethod: order.payment_method,
    //       paymentMethodTitle: order.payment_method_title,
    //       transactionId: order.transaction_id,
    //     });
    //     await queryRunner.manager.save(orderEntity);

    //     await queryRunner.commitTransaction();
    //   }
    // } catch (error) {
    //   await queryRunner.rollbackTransaction();
    //   throw error;
    // } finally {
    //   await queryRunner.release();
    // }

    return order;
  }

  async listAllOrders_prod(page: number, size: number): Promise<any> {
    const params = { page, per_page: size };
    const orders = await this.wooCommerceProd
      .get('orders', params)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return orders;
  }

  async updateAnOrder_prod(order_id: string, data: any): Promise<any> {
    const order = await this.wooCommerceProd
      .put(`orders/${order_id}`, data)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return order;
  }

  async deleteAnOrder_prod(order_id: string): Promise<any> {
    const order = await this.wooCommerceProd
      .put(`orders/${order_id}`, { force: true })
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return order;
  }
}
