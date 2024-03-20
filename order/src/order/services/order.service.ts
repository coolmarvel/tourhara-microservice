import { Injectable } from '@nestjs/common';
import { IOrderService } from '../interfaces/order.interface';

import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { ConfigService } from '@nestjs/config';
import { DataSource, QueryRunner } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrderStatus } from '../constants/order-status.enum';
import { BillingService } from 'src/billing/services/billing.service';
import { ShippingService } from 'src/shipping/services/shipping.service';
import { PaymentService } from 'src/payment/services/payment.service';
import { GuestHouseService } from 'src/guest-house/services/guest-house.service';
import { TourService } from 'src/tour/services/tour.service';

@Injectable()
export class OrderService implements IOrderService {
  private wooCommerceStag: WooCommerceRestApi;
  private wooCommerceProd: WooCommerceRestApi;

  constructor(
    private dataSource: DataSource,
    private configService: ConfigService,

    private readonly billingService: BillingService,
    private readonly shippingService: ShippingService,
    private readonly paymentService: PaymentService,
    private readonly guestHouseService: GuestHouseService,
    private readonly tourService: TourService,
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

  // --
  async insertOrder_prod(): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      for (let i = 1; i < 2; i++) {
        console.log(`order migrate (page: ${i})`);
        const params = { page: i, per_page: 10 };
        const orders = await this.wooCommerceProd
          .get('orders', params)
          .then((response: any) => response.data)
          .catch((error: any) => error.response.data);

        if (orders.length === 0) break;
        for (const order of orders) {
          const existingOrder = await queryRunner.manager.findOne(Order, { where: { id: order.id } });
          if (existingOrder) continue;

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

          const billing = order.billing;
          await this.billingService.saveBilling_prod(queryRunner, orderId, billing);

          const shipping = order.shipping;
          await this.shippingService.saveShipping_prod(queryRunner, orderId, shipping);

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
          await this.paymentService.savePayment_prod(queryRunner, orderId, payment);

          // TODO. Under Domain
          const guestHouse = order.guest_house;
          await this.guestHouseService.saveGuestHouse_prod(queryRunner, orderId, guestHouse);

          const tour = order.tour;
          await this.tourService.saveTour_prod(queryRunner, orderId, tour);

          const tourInfo = order.tour_info;
          await this.tourService.saveTourInfo_prod(queryRunner, orderId, tourInfo);

          const snapInfo = order.snap_info;

          const usimInfo = order.usim_info;

          const h2ousim = order.h2ousim;

          const jfkOneway = order.jfk_oneway;

          const jfkShuttleRt = order.jfk_shuttle_rt;
        }
      }

      await queryRunner.commitTransaction();

      return 'insertOrder_prod success';
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async saveOrderMetadata_prod(queryRunner: QueryRunner, orderId: string, metadata: any): Promise<any> {
    try {
      await queryRunner.startTransaction();

      await queryRunner.commitTransaction();

      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }
}
