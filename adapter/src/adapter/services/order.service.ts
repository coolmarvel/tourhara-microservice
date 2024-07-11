import { Injectable, Logger } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';

import { IOrderService } from '../interfaces';

@Injectable()
export default class OrderService implements IOrderService {
  constructor(private dataSource: DataSource) {}

  private readonly logger = new Logger(OrderService.name);

  private trackMemoryUsage(): void {
    const used = process.memoryUsage();
    const messages = [];
    for (const key in used) {
      messages.push(`${key}: ${Math.round((used[key] / 1024 / 1024) * 100) / 100} MB`);
    }
    this.logger.log(messages.join(', '));
  }

  async getOrders(product_id: string, after: string, before: string): Promise<any> {
    this.trackMemoryUsage();

    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      const afterDate = this.toKSTAfterDate(after);
      const beforeDate = this.toKSTBeforeDate(before);
      const orders = await queryRunner.manager.query(
        `SELECT id, status, currency, currency_symbol, date_created, date_created_gmt,
          date_modified, date_modified_gmt, date_completed, date_completed_gmt
        FROM \`order\` WHERE date_created_gmt>=? AND date_created_gmt<=?;`,
        [afterDate, beforeDate],
      );

      const formattedOrders = [];
      for (const order of orders) {
        const relevantLineItems = await this.aggregateLineItems(queryRunner, order.id, product_id);
        if (relevantLineItems.length > 0) {
          const orderDetails = await this.aggregateOrderDetails(queryRunner, order.id);
          for (const lineItem of relevantLineItems) lineItem.meta_data = await this.aggregateLineItemDetails(queryRunner, lineItem.id);

          const payment = await queryRunner.manager.query(
            `SELECT payment_method, payment_method_title, transaction_id, payment_url, needs_payment
            FROM \`payment\` WHERE order_id=?;`,
            [order.id],
          );

          formattedOrders.push({
            order: { ...order, meta_data: orderDetails.order_metadata },
            line_items: relevantLineItems,
            payment: payment[0] || {},
            billing: orderDetails.billing,
            shipping: orderDetails.shipping,
            guest_house: orderDetails.guest_house,
            jfk_oneway: orderDetails.jfk_oneway,
            jfk_shuttle_rt: orderDetails.jfk_shuttle_rt,
            h2o_usim: orderDetails.h2o_usim,
            usim_info: orderDetails.usim_info,
            tour: orderDetails.tour,
            tour_info: orderDetails.tour_info,
            snap_info: orderDetails.snap_info,
          });
        }
      }
      this.trackMemoryUsage();

      return formattedOrders;
    } catch (error: any) {
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private toKSTAfterDate(dateString: string): Date {
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0);
    date.setHours(date.getHours() + 9);

    return date;
  }

  private toKSTBeforeDate(dateString: string): Date {
    const date = new Date(dateString);
    date.setHours(23, 59, 59, 999);
    date.setHours(date.getHours() + 9);

    return date;
  }

  private async aggregateLineItems(queryRunner: QueryRunner, orderId: number, product_id: string): Promise<any[]> {
    const productIds = product_id.split(',');
    const relevantLineItems = [];

    for (const productId of productIds) {
      const lineItems = await queryRunner.manager.query(
        `SELECT li.line_item_id, li.id, li.\`key\`, li.value FROM \`line_item\` li 
        JOIN \`line_item\` product_id_li ON li.order_id=product_id_li.order_id AND li.id=product_id_li.id
        WHERE li.order_id=? AND product_id_li.\`key\`='product_id' AND product_id_li.value=?;`,
        [orderId, productId],
      );

      const lineItemMap = {};
      const bundledItemsMap = {};
      lineItems.forEach((item: any) => {
        if (!lineItemMap[item.id]) lineItemMap[item.id] = { id: item.id };
        lineItemMap[item.id][item.key] = item.value;

        if (item.key.includes('bundled_items')) bundledItemsMap[item.id] = item.value.split(',').map((id: string) => parseInt(id, 10));
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const [lineItemId, bundledIds] of Object.entries(bundledItemsMap)) {
        if (Array.isArray(bundledIds)) {
          for (const bundledId of bundledIds) {
            const bundledItems = await queryRunner.manager.query(`SELECT li.id, li.\`key\`, li.value FROM \`line_item\` li WHERE li.id=? AND li.order_id=?;`, [bundledId, orderId]);

            bundledItems.forEach((item: any) => {
              if (!lineItemMap[item.id]) lineItemMap[item.id] = { id: item.id };
              lineItemMap[item.id][item.key] = item.value;
            });
          }
        }
      }

      relevantLineItems.push(...Object.values(lineItemMap));
    }

    return relevantLineItems;
  }

  private async aggregateOrderDetails(queryRunner: QueryRunner, orderId: number): Promise<any> {
    try {
      const categories = ['order_metadata', 'billing', 'shipping', 'guest_house', 'jfk_oneway', 'jfk_shuttle_rt', 'h2o_usim', 'usim_info', 'snap_info', 'tour', 'tour_info'];
      const details = {};

      for (const category of categories) {
        const results = await queryRunner.manager.query(`SELECT \`key\`, value FROM \`${category}\` WHERE order_id=?;`, [orderId]);
        details[category] = results.reduce((acc, item) => {
          acc[item.key] = item.value;

          return acc;
        }, {});
      }

      return details;
    } catch (error: any) {
      throw error;
    }
  }

  private async aggregateLineItemDetails(queryRunner: QueryRunner, lineItemId: number): Promise<any> {
    const metadata = await queryRunner.manager.query(`SELECT \`key\`, value FROM \`line_item_metadata\` WHERE line_item_id=?;`, [lineItemId]);
    return metadata.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {});
  }
}
