import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { InjectDataSource } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Order } from '../entities/order.entity';
import { OrderStatus } from '../constants/order-status.enum';
import { GuestHouseStagingService } from 'src/guest-house/services/guest-house-staging.service';
import ShippingStagingService from 'src/shipping/services/shipping-staging.service';
import { BillingStagingService } from 'src/billing/services/billing-staging.service';
import { PaymentStagingService } from 'src/payment/services/payment-staging.service';
import { TourStagingService } from 'src/tour/services/tour-staging.service';
import { UsimStagingService } from 'src/usim/services/usim-staging.service';
import { JfkStagingService } from 'src/jfk/services/jfk-staging.service';
import { OrderMetadata } from '../entities/order-metadata.entity';
import { IOrderService } from '../interfaces/order.interface';

@Injectable()
export class OrderStagingService implements IOrderService {
  private wooCommerce: WooCommerceRestApi;

  constructor(
    private configService: ConfigService,
    @InjectDataSource('staging') private dataSource: DataSource,

    private readonly guestHouseService: GuestHouseStagingService,
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

  /**
   * WooCommerce
   */
  async createAnOrder(payload: any): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async retrieveAnOrder(order_id: number): Promise<any> {
    const order = await this.wooCommerce
      .get(`orders/${order_id}`)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return order;
  }

  async listAllOrders(page: number, size: number): Promise<any> {
    const params = { page, per_page: size };
    const orders = await this.wooCommerce
      .get('orders', params)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return orders;
  }

  async updateAnOrder(order_id: number, data: any): Promise<any> {
    const order = await this.wooCommerce
      .put(`orders/${order_id}`, data)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return order;
  }

  async deleteAnOrder(order_id: number): Promise<any> {
    const order = await this.wooCommerce
      .put(`orders/${order_id}`, { force: true })
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return order;
  }

  /**
   * Synchronize
   */
  async synchronizeOrder(): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      for (let i = 1; i < Infinity; i++) {
        const orders = await this.listAllOrders(i, 10);
        if (orders.length === 0) break;

        console.log(`Order migration (page: ${i})`);
        for (const order of orders) {
          // order save
          const orderId = await this.insert(queryRunner, order, null, null);

          if (orderId !== false) {
            // billing save
            const billing = order.billing;
            await this.billingService.insert(queryRunner, billing, orderId);

            // shipping save
            const shipping = order.shipping;
            await this.shippingService.insert(queryRunner, shipping, orderId);

            // payment save
            const payment = {
              paymentMethod: order.payment_method,
              paymentMethodTitle: order.payment_method_title,
              transactionId: order.transaction_id,
              paymentUrl: order.payment_url,
              needsPayment: order.needs_payment,
              needsProcessing: order.needs_processing,
              datePaid: order.date_paid,
              datePaidGmt: order.date_paid_gmt,
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

            // TODO. order-metadata save
            const metadatas = order.meta_data;
            for (const metadata of metadatas) {
              await this.insert(queryRunner, null, metadata, orderId);
            }

            // TODO. order-line-items save
            const lineItems = order.line_items;
            for (const lineItem of lineItems) {
            }
          }
        }

        await queryRunner.commitTransaction();
      }

      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async insert(queryRunner: QueryRunner, order: any, metadata: any, orderId: string): Promise<any> {
    try {
      // order save
      if (order !== null && metadata == null) {
        const existingOrder = await queryRunner.manager.findOne(Order, { where: { id: order.id } });
        if (existingOrder) return false;

        const newOrder = {
          id: order.id,
          status: OrderStatus[order.status.toUpperCase() as keyof typeof OrderStatus],
          currency: order.currency,
          currencySymbol: order.currency_symbol,
          dateCreated: order.date_created,
          dateCreatedGmt: order.date_created_gmt,
          dateModified: order.date_modified,
          dateModifiedGmt: order.date_modified_gmt,
          dateCompleted: order.date_completed,
          dateCompletedGmt: order.date_completed_gmt,
        };
        const orderEntity = queryRunner.manager.create(Order, newOrder);
        const orderResult = await queryRunner.manager.save(orderEntity);
        const orderId = orderResult.orderId;

        return orderId;
      }
      // order-metadata save
      else if (order === null && metadata !== null) {
        const existingOrderMetadata = await queryRunner.manager.findOne(OrderMetadata, { where: { id: metadata.id } });
        if (existingOrderMetadata) return false;

        const newOrderMetadata = {
          id: metadata.id,
          key: metadata.key,
          value: metadata.value,
          orderId: orderId,
        };
        const orderMetadataEntity = queryRunner.manager.create(OrderMetadata, newOrderMetadata);
        await queryRunner.manager.save(orderMetadataEntity);

        return true;
      }
    } catch (error) {
      throw error;
    }
  }

  async update(queryRunner: QueryRunner): Promise<any> {
    try {
      return true;
    } catch (error) {
      throw error;
    }
  }

  async select(queryRunner: QueryRunner): Promise<any> {
    try {
      return true;
    } catch (error) {
      throw error;
    }
  }

  async delete(queryRunner: QueryRunner): Promise<any> {
    try {
      return true;
    } catch (error) {
      throw error;
    }
  }

  async orderCreated(payload: any): Promise<any> {
    try {
      return true;
    } catch (error) {
      throw error;
    }
  }

  async orderUpdated(payload: any): Promise<any> {
    try {
      return true;
    } catch (error) {
      throw error;
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
