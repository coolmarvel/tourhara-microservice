import { Injectable } from '@nestjs/common';
import { IOrderService } from '../interfaces/order.interface';

import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { Order } from '../entities/order.entity';
import { Billing } from '../entities/billing.entity';
import { Shipping } from '../entities/shipping.entity';
import { OrderMetaData } from '../entities/order-metadata.entity';
import { LineItemMetaData } from '../entities/line-item-metadata.entity';
import { LineItem } from '../entities/line-item.entity';

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

  async createAnOrder_prod(payment: object, billing: object, shipping: object, line_items: object, shipping_lines: object): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async retrieveAnOrder_prod(order_id: string): Promise<any> {
    const order = await this.wooCommerceProd
      .get(`orders/${order_id}`)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const exist = await queryRunner.manager.findOneBy(Order, { orderId: order_id });
      if (!exist) {
        // Billing entity
        const billingEntity = queryRunner.manager.create(Billing, {
          firstName: order.billing.first_name,
          email: order.billing.email,
          phone: order.billing.phone,
          survey: order.billing.survey,
        });
        await queryRunner.manager.save(billingEntity);

        // Shipping entity
        const shippingEntity = queryRunner.manager.create(Shipping, {
          firstName: order.shipping.first_name,
        });
        await queryRunner.manager.save(shippingEntity);

        // Prepare empty arrays for metadata and lineItems
        const metadataEntities = [];
        const lineItemEntities = [];

        // Order Metadata entities
        for (const metadata of order.meta_data) {
          const orderMetadataEntity = queryRunner.manager.create(OrderMetaData, {
            id: metadata.id,
            key: metadata.key,
            value: metadata.value,
          });
          metadataEntities.push(orderMetadataEntity);
        }
        await queryRunner.manager.save(metadataEntities);

        // LineItem and LineItemMetaData entities
        for (const item of order.line_items) {
          const lineItemsMetadataEntities = [];
          for (const metadata of item.meta_data) {
            const lineItemMetadataEntity = queryRunner.manager.create(LineItemMetaData, {
              id: metadata.id,
              key: metadata.key,
              value: metadata.value,
            });
            lineItemsMetadataEntities.push(lineItemMetadataEntity);
          }
          await queryRunner.manager.save(lineItemsMetadataEntities);

          const lineItemEntity = queryRunner.manager.create(LineItem, {
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            total: item.total,
            subtotal: item.subtotal,
            metadata: lineItemsMetadataEntities,
          });
          lineItemEntities.push(lineItemEntity);
        }
        await queryRunner.manager.save(lineItemEntities);

        // Order entity
        const orderEntity = queryRunner.manager.create(Order, {
          id: order.id,
          status: order.status,
          currency: order.currency,
          dateCreated: new Date(order.date_created),
          dateModified: new Date(order.date_modified),
          dateCompleted: order.date_completed ? new Date(order.date_completed) : null,
          datePaid: order.date_paid ? new Date(order.date_paid) : null,
          billing: billingEntity,
          shipping: shippingEntity,
          paymentMethod: order.payment_method,
          paymentMethodTitle: order.payment_method_title,
          transactionId: order.transaction_id,
          metadata: metadataEntities,
          lineItems: lineItemEntities,
        });
        await queryRunner.manager.save(orderEntity);

        await queryRunner.commitTransaction();
      }
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }

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
