import { Injectable } from '@nestjs/common';
import { OrderStatus } from 'src/order/constants/order-status.enum';
import { IOrderService } from 'src/order/interfaces/order.interface';
import { DataSource, QueryRunner } from 'typeorm';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { ConfigService } from '@nestjs/config';
import { InjectDataSource } from '@nestjs/typeorm';
import { LineItemMetadataStagingService } from './line-item-metadata.staging.service';
import { OrderMetadataStagingService } from './order-metadata.staging.service';
import { GuestHouseStagingService } from './guest-house.staging.service';
import { LineItemStagingService } from './line-item.staging.service';
import { ShippingStagingService } from './shipping.staging.service';
import { BillingStagingService } from './billing.staging.service';
import { PaymentStagingService } from './payment.staging.service';
import { TourStagingService } from './tour.staging.service';
import { UsimStagingService } from './usim.staging.service';
import { JfkStagingService } from './jfk.staging.service';
import { logger } from 'src/common/logger/logger.service';

@Injectable()
export class OrderStagingService implements IOrderService {
  private wooCommerce: WooCommerceRestApi;

  constructor(
    private configService: ConfigService,
    @InjectDataSource('staging') private dataSource: DataSource,
    private readonly lineItemMetadataService: LineItemMetadataStagingService,
    private readonly orderMetadataService: OrderMetadataStagingService,
    private readonly guestHouseService: GuestHouseStagingService,
    private readonly lineItemService: LineItemStagingService,
    private readonly shippingService: ShippingStagingService,
    private readonly billingService: BillingStagingService,
    private readonly paymentService: PaymentStagingService,
    private readonly tourService: TourStagingService,
    private readonly usimService: UsimStagingService,
    private readonly jfkService: JfkStagingService,
  ) {
    this.wooCommerce = new WooCommerceRestApi({
      url: this.configService.get('wc-stag.url'),
      consumerKey: this.configService.get('wc-stag.key'),
      consumerSecret: this.configService.get('wc-stag.secret'),
      version: 'wc/v3',
    });
  }

  createAnOrder(payload: any): Promise<any> {
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

  retrieveAnOrder(order_id: number): Promise<any> {
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

  listAllOrders(page: number, size: number, date: string): Promise<any> {
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

  updateAnOrder(order_id: number, data: any): Promise<any> {
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

  deleteAnOrder(order_id: number): Promise<any> {
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

  insert(queryRunner: QueryRunner, order: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingOrder = await queryRunner.manager.query(`SELECT * FROM \`order\` WHERE id=?;`, [BigInt(order.id)]);
        if (existingOrder.length > 0) return resolve(true);

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

        return resolve(BigInt(order.id));
      } catch (error) {
        logger.error('Order Service Insert Error');
        logger.error(error);
        return reject(error);
      }
    });
  }

  update(queryRunner: QueryRunner, order: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingOrder = await queryRunner.manager.query(`SELECT * FROM \`order\`  WHERE id=?;`, [BigInt(order.id)]);
        if (existingOrder.length === 0) return resolve(true);

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

        return resolve(BigInt(existingOrder[0].id));
      } catch (error) {
        logger.error('Order Service Update Error');
        logger.error(error);
        return reject(error);
      }
    });
  }

  orderCreated(payload: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
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

        return resolve(true);
      } catch (error) {
        await queryRunner.rollbackTransaction();
        return reject(error);
      } finally {
        await queryRunner.release();
      }
    });
  }

  orderUpdated(payload: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
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
        } else return resolve(await this.orderCreated(order));

        return resolve(true);
      } catch (error) {
        await queryRunner.rollbackTransaction();
        return reject(error);
      } finally {
        await queryRunner.release();
      }
    });
  }

  orderDeleted(payload: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        return resolve(true);
      } catch (error) {
        return reject(error);
      }
    });
  }

  orderRestored(payload: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        return resolve(true);
      } catch (error) {
        return reject(error);
      }
    });
  }
}
