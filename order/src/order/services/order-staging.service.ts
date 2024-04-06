import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner, TransactionNotStartedError } from 'typeorm';
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
import { LineItemStagingService } from 'src/line-item/services/line-item-staging.service';
import { CheckListStagingService } from 'src/check-list/services/check-list-staging.service';

@Injectable()
export class OrderStagingService implements IOrderService {
  private wooCommerce: WooCommerceRestApi;

  constructor(
    private configService: ConfigService,
    @InjectDataSource('staging') private dataSource: DataSource,

    private readonly guestHouseService: GuestHouseStagingService,
    private readonly lineItemService: LineItemStagingService,
    private readonly shippingService: ShippingStagingService,
    private readonly billingService: BillingStagingService,
    private readonly paymentService: PaymentStagingService,
    private readonly tourService: TourStagingService,
    private readonly usimService: UsimStagingService,
    private readonly jfkService: JfkStagingService,
    private readonly checkListService: CheckListStagingService,
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

  async listAllOrders(page: number, size: number, date: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const beforeDate = new Date(date);
      beforeDate.setDate(beforeDate.getDate() + 1);

      const params = {
        page,
        per_page: size,
        after: `${date}T00:00:00`,
        before: `${beforeDate.toISOString().split('T')[0]}T00:00:00`,
      };
      this.wooCommerce.get('orders', params).then((response: any) => {
        if (response && response.data) resolve(response.data);
        else reject(new Error('No data found in response'));
      });
    });
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

  async sleep(ms: number) {
    const wakeUpTime = Date.now() + ms;
    while (Date.now() < wakeUpTime) {}
  }

  /**
   * Synchronize
   */
  // async synchronizeOrder(page_number: number): Promise<any> {
  //   const queryRunner = this.dataSource.createQueryRunner();
  //   await queryRunner.connect();

  //   try {
  //     const today = new Date();
  //     today.setHours(0, 0, 0, 0);

  //     const size: number = 10;
  //     let isContinue: boolean = true;

  //     console.log('Staging Order migration start');
  //     for (let i = 0; isContinue && i < Infinity; i++) {
  //       let date = await this.checkListService.select(queryRunner);
  //       console.log('date: ', date, ' start');

  //       const continueDate = new Date(date);
  //       if (continueDate >= today) break;

  //       let total: number = 0;
  //       for (let j = 1; j < Infinity; j++) {
  //         const orders = await this.listAllOrders(j, size, date);
  //         if (orders.length === 0) {
  //           const data = { date: date, page: j - 1, perPage: size, total: total };
  //           await queryRunner.startTransaction();
  //           await this.checkListService.insert(queryRunner, data);
  //           await queryRunner.commitTransaction();

  //           break;
  //         }

  //         total += orders.length;
  //         console.log(`Staging Order migration (page: ${j}, orders: ${orders.length})`);
  //         for (const order of orders) {
  //           await queryRunner.startTransaction();

  //           // order save
  //           const orderId = await this.insert(queryRunner, order, null, null);
  //           if (orderId !== false) {
  //             // billing save
  //             const billing = order.billing;
  //             await this.billingService.insert(queryRunner, billing, orderId);

  //             // shipping save
  //             const shipping = order.shipping;
  //             await this.shippingService.insert(queryRunner, shipping, orderId);

  //             // payment save
  //             const payment = {
  //               paymentMethod: order.payment_method,
  //               paymentMethodTitle: order.payment_method_title,
  //               transactionId: order.transaction_id,
  //               paymentUrl: order.payment_url,
  //               needsPayment: order.needs_payment,
  //               needsProcessing: order.needs_processing,
  //               datePaid: order.date_paid,
  //               datePaidGmt: order.date_paid_gmt,
  //             };
  //             await this.paymentService.insert(queryRunner, payment, orderId);

  //             // guest-house save
  //             const guestHouse = order.guest_house;
  //             await this.guestHouseService.insert(queryRunner, guestHouse, orderId);

  //             // tour, tour-info save
  //             const tour = order.tour;
  //             const tourInfo = order.tour_info;
  //             await this.tourService.insert(queryRunner, tour, tourInfo, orderId);

  //             // snap-info, usim-info, h2ousim save
  //             const snapInfo = order.snap_info;
  //             const usimInfo = order.usim_info;
  //             const h2ousim = order.h2ousim;
  //             await this.usimService.insert(queryRunner, snapInfo, usimInfo, h2ousim, orderId);

  //             // jfk-oneway, jfk-shuttle-rt save
  //             const jfkOneway = order.jfk_oneway;
  //             const jfkShuttleRt = order.jfk_shuttle_rt;
  //             await this.jfkService.insert(queryRunner, jfkOneway, jfkShuttleRt, orderId);

  //             // TODO. order-metadata save
  //             const metadatas = order.meta_data;
  //             for (const metadata of metadatas) {
  //               await this.insert(queryRunner, null, metadata, orderId);
  //             }

  //             // TODO. order-line-items save
  //             const lineItems = order.line_items;
  //             for (const lineItem of lineItems) {
  //               await this.lineItemService.insert(queryRunner, lineItem, orderId);
  //             }
  //           }

  //           await queryRunner.commitTransaction();
  //           this.sleep(1000);
  //         }
  //       }

  //       this.sleep(1000);
  //       console.log('date: ', date, ' end');
  //     }
  //     console.log('Staging Order migration end');

  //     return true;
  //   } catch (error) {
  //     console.error(`Error occurred during order migration for page: ${page_number}`, error);

  //     if (error.message.includes('Transaction is not started yet')) {
  //       console.error(`Transaction not started error caught for page: ${page_number}, retrying...`);
  //       await this.synchronizeOrder(page_number);
  //     } else if (error.message.includes("Cannot read properties of undefined (reading 'length')")) {
  //       console.error(`Woocommerce API error caught for page: ${page_number}, retrying...`);
  //       await this.synchronizeOrder(page_number);
  //     } else {
  //       console.error(error.message);
  //       await queryRunner.rollbackTransaction();
  //     }
  //   } finally {
  //     await queryRunner.release();
  //   }
  // }

  async synchronizeOrder(page_number: number): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const size: number = 50;
      let date = await this.checkListService.select(queryRunner);
      let continueDate = new Date(date);

      if (continueDate < today) {
        console.log('Staging Order migration start for date:', date);
        let total: number = 0;
        for (let i = 1; ; i++) {
          const orders = await this.listAllOrders(i, size, date);
          if (orders.length === 0) {
            if (total > 0) {
              // 데이터가 한 번이라도 동기화된 경우에만 insert
              const data = { date: date, page: i - 1, perPage: size, total: total };
              await queryRunner.startTransaction();
              await this.checkListService.insert(queryRunner, data);
              await queryRunner.commitTransaction();
              console.log('Staging Order migration check');
            }
            break;
          } else {
            page_number = i;
            total += orders.length;
            console.log(`Staging Order migration (page: ${i}, orders: ${orders.length}) for date:`, date);
            await queryRunner.startTransaction();
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

                // order-metadata save
                const metadatas = order.meta_data;
                for (const metadata of metadatas) {
                  await this.insert(queryRunner, null, metadata, orderId);
                }

                // order-line-items save
                const lineItems = order.line_items;
                for (const lineItem of lineItems) {
                  await this.lineItemService.insert(queryRunner, lineItem, orderId);
                }
              }
            }
            await queryRunner.commitTransaction();
          }

          await this.sleep(30000);
        }
        console.log('Staging Order migration end for date:', date);
        return true;
      } else {
        console.log('No migration needed. Current date is past the target migration date.');
        return false;
      }
    } catch (error) {
      console.error(`Error occurred during order migration for page: ${page_number}`, error);

      // if (error.message.includes('Transaction is not started yet')) {
      //   console.error(`Transaction not started error caught for page: ${page_number}, retrying...`);
      //   // await this.synchronizeOrder(page_number);
      // } else if (error.message.includes("Cannot read properties of undefined (reading 'length')")) {
      //   console.error(`Woocommerce API error caught for page: ${page_number}, retrying...`);
      //   // await this.synchronizeOrder(page_number);
      // } else {
      //   console.error(error.message);
      //   await queryRunner.rollbackTransaction();
      // }

      return false;
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
      console.error('order insert error');
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
