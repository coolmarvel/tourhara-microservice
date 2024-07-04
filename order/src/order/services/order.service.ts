import { DataSource, QueryRunner } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { IOrderService } from '../interfaces/order.interface';
import { OrderMetadataService } from './order-metadata.service';
import { LineItemMetadataService } from './line-item-metadata.service';
import { GuestHouseService } from './guest-house.service';
import { LineItemService } from './line-item.service';
import { ShippingService } from './shipping.service';
import { BillingService } from './billing.service';
import { PaymentService } from './payment.service';
import { TourService } from './tour.service';
import { UsimService } from './usim.service';
import { JfkService } from './jfk.service';
import { OrderStatus } from '../constants/order-status.enum';
import { logger } from '../../common';

@Injectable()
export class OrderService implements IOrderService {
  private wooCommerce: WooCommerceRestApi;

  constructor(
    private dataSource: DataSource,
    private configService: ConfigService,
    private readonly lineItemMetadataService: LineItemMetadataService,
    private readonly orderMetadataService: OrderMetadataService,
    private readonly guestHouseService: GuestHouseService,
    private readonly lineItemService: LineItemService,
    private readonly shippingService: ShippingService,
    private readonly billingService: BillingService,
    private readonly paymentService: PaymentService,
    private readonly tourService: TourService,
    private readonly usimService: UsimService,
    private readonly jfkService: JfkService,
  ) {
    this.wooCommerce = new WooCommerceRestApi({
      url: this.configService.get('wc.url'),
      consumerKey: this.configService.get('wc.key'),
      consumerSecret: this.configService.get('wc.secret'),
      version: 'wc/v3',
    });
  }

  async createAnOrder(payload: any): Promise<any> {
    try {
      return await this.wooCommerce
        .post(`orders`, payload)
        .then((response: any) => response.data)
        .catch((error: any) => error.response.data);
    } catch (error) {
      throw error;
    }
  }

  async retrieveAnOrder(order_id: number): Promise<any> {
    try {
      return await this.wooCommerce
        .get(`orders/${order_id}`)
        .then((response: any) => response.data)
        .catch((error: any) => error.response.data);
    } catch (error) {
      throw error;
    }
  }

  async listAllOrders(page: number, size: number, date: string): Promise<any> {
    try {
      const beforeDate = new Date(date);
      beforeDate.setDate(beforeDate.getDate() + 1);

      const params = {
        page,
        per_page: size,
        after: `${date}T00:00:00`,
        before: `${beforeDate.toISOString().split('T')[0]}T00:00:00`,
      };

      return await this.wooCommerce.get('orders', params).then((response: any) => {
        if (response && response.data) return response.data;
      });
    } catch (error) {
      throw error;
    }
  }

  async updateAnOrder(order_id: number, data: any): Promise<any> {
    try {
      return await this.wooCommerce
        .put(`orders/${order_id}`, data)
        .then((response: any) => response.data)
        .catch((error: any) => error.response.data);
    } catch (error) {
      throw error;
    }
  }

  async deleteAnOrder(order_id: number): Promise<any> {
    try {
      return await this.wooCommerce
        .put(`orders/${order_id}`, { force: true })
        .then((response: any) => response.data)
        .catch((error: any) => error.response.data);
    } catch (error) {
      throw error;
    }
  }

  async insert(queryRunner: QueryRunner, order: any): Promise<any> {
    try {
      const existingOrder = await queryRunner.manager.query(`SELECT * FROM \`order\` WHERE id=?;`, [BigInt(order.id)]);
      if (existingOrder.length > 0) return true;

      await queryRunner.manager.query(
        `INSERT INTO \`order\` (
            id,status,currency,currency_symbol,date_created,date_created_gmt,date_modified,
            date_modified_gmt,date_completed,date_completed_gmt,created_at,updated_at
          ) VALUES (?,?,?,?,?,?,?,?,?,?,NOW(),NOW());`,
        [
          BigInt(order.id),
          OrderStatus[order.status.toUpperCase() as keyof typeof OrderStatus],
          order.currency,
          order.currency_symbol,
          order.date_created === null ? null : order.date_created,
          order.date_created_gmt === null ? null : order.date_created_gmt,
          order.date_modified === null ? null : order.date_modified,
          order.date_modified_gmt === null ? null : order.date_modified_gmt,
          order.date_completed === null ? null : order.date_completed,
          order.date_completed_gmt === null ? null : order.date_completed_gmt,
        ],
      );

      return BigInt(order.id);
    } catch (error) {
      logger.error('Order Service Insert Error');
      logger.error(error);
      throw error;
    }
  }

  async update(queryRunner: QueryRunner, order: any): Promise<any> {
    try {
      const existingOrder = await queryRunner.manager.query(`SELECT * FROM \`order\`  WHERE id=?;`, [BigInt(order.id)]);
      if (existingOrder.length === 0) return true;

      await queryRunner.manager.query(
        `UPDATE \`order\` SET
            status=?,date_modified=?,date_modified_gmt=?,date_completed=?,
            date_completed_gmt=?,updated_at=NOW()
          WHERE id=?;`,
        [
          OrderStatus[order.status.toUpperCase() as keyof typeof OrderStatus],
          order.date_modified === null ? null : order.date_modified,
          order.date_modified_gmt === null ? null : order.date_modified_gmt,
          order.date_completed === null ? null : order.date_completed,
          order.date_completed_gmt === null ? null : order.date_completed_gmt,
          BigInt(order.id),
        ],
      );

      return BigInt(existingOrder[0].id);
    } catch (error) {
      logger.error('Order Service Update Error');
      logger.error(error);
      throw error;
    }
  }

  async orderCreated(payload: any): Promise<any> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      // order save
      const order = payload;
      const orderId = await this.insert(queryRunner, order);

      if (typeof orderId === 'bigint') {
        // billing save
        const billing = order.billing;
        await this.billingService.insert(queryRunner, billing, orderId);

        // shipping save
        const shipping = order.shipping;
        await this.shippingService.insert(queryRunner, shipping, orderId);

        // payment save
        const payment = {
          payment_method: order.payment_method,
          payment_method_title: order.payment_method_title,
          transaction_id: order.transaction_id,
          payment_url: order.payment_url,
          needs_payment: order.needs_payment,
          needs_processing: order.needs_processing,
          date_paid: order.date_paid,
          date_paid_gmt: order.date_paid_gmt,
        };
        await this.paymentService.insert(queryRunner, payment, orderId);

        // guest-house save
        const guestHouse = order.guest_house;
        await this.guestHouseService.insert(queryRunner, guestHouse, orderId);

        // tour, tour-info save
        const tour = order.tour;
        const tourInfo = order.tour_info;
        await this.tourService.insert(queryRunner, tour, tourInfo, orderId);

        // snap-info, usim-info, h2ousim save
        const snapInfo = order.snap_info;
        const usimInfo = order.usim_info;
        const h2ousim = order.h2ousim;
        await this.usimService.insert(queryRunner, snapInfo, usimInfo, h2ousim, orderId);

        // jfk-oneway, jfk-shuttle-rt save
        const jfkOneway = order.jfk_oneway;
        const jfkShuttleRt = order.jfk_shuttle_rt;
        await this.jfkService.insert(queryRunner, jfkOneway, jfkShuttleRt, orderId);

        // order-metadata save
        const orderMetadatas = order.meta_data;
        for (const metadata of orderMetadatas) {
          await this.orderMetadataService.insert(queryRunner, metadata, orderId);
        }

        // order-line-items save
        const lineItems = order.line_items;
        for (const lineItem of lineItems) {
          const lineItemId = await this.lineItemService.insert(queryRunner, lineItem, orderId);

          const lineItemMetadatas = lineItem.meta_data;
          for (const metadata of lineItemMetadatas) {
            await this.lineItemMetadataService.insert(queryRunner, metadata, lineItemId);
          }
        }
      }

      await queryRunner.commitTransaction();

      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async orderUpdated(payload: any): Promise<any> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      console.log(payload);

      await queryRunner.startTransaction();

      // order update
      const order = payload;
      const orderId = await this.update(queryRunner, order);

      if (typeof orderId === 'bigint') {
        // billing update
        const billing = order.billing;
        await this.billingService.update(queryRunner, billing, orderId);

        // shipping update
        const shipping = order.shipping;
        await this.shippingService.update(queryRunner, shipping, orderId);

        // payment update
        const payment = {
          payment_method: order.payment_method,
          payment_method_title: order.payment_method_title,
          transaction_id: order.transaction_id,
          payment_url: order.payment_url,
          needs_payment: order.needs_payment,
          needs_processing: order.needs_processing,
          date_paid: order.date_paid,
          date_paid_gmt: order.date_paid_gmt,
        };
        await this.paymentService.update(queryRunner, payment, orderId);

        // guest-house update
        const guestHouse = order.guest_house;
        await this.guestHouseService.update(queryRunner, guestHouse, orderId);

        // tour, tour-info update
        const tour = order.tour;
        const tourInfo = order.tour_info;
        await this.tourService.update(queryRunner, tour, tourInfo, orderId);

        // snap-info, usim-info, h2ousim update
        const snapInfo = order.snap_info;
        const usimInfo = order.usim_info;
        const h2ousim = order.h2ousim;
        await this.usimService.update(queryRunner, snapInfo, usimInfo, h2ousim, orderId);

        // jfk-oneway, jfk-shuttle-rt update
        const jfkOneway = order.jfk_oneway;
        const jfkShuttleRt = order.jfk_shuttle_rt;
        await this.jfkService.update(queryRunner, jfkOneway, jfkShuttleRt, orderId);

        // order-metadata update
        const orderMetadatas = order.meta_data;
        for (const metadata of orderMetadatas) {
          await this.orderMetadataService.update(queryRunner, metadata, orderId);
        }

        // order-line-items update
        const lineItems = order.line_items;
        for (const lineItem of lineItems) {
          const lineItemId = await this.lineItemService.update(queryRunner, lineItem, orderId);

          const lineItemMetadatas = lineItem.meta_data;
          for (const metadata of lineItemMetadatas) {
            await this.lineItemMetadataService.update(queryRunner, metadata, lineItemId);
          }
        }

        await queryRunner.commitTransaction();
      } else return await this.orderCreated(order);

      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async orderDeleted(payload: any): Promise<any> {
    try {
      return true;
    } catch (error) {
      throw error;
    }
  }

  async orderRestored(payload: any): Promise<any> {
    try {
      return true;
    } catch (error) {
      throw error;
    }
  }
}
