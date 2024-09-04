import { Injectable, Logger } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';

import { IAdapterService } from '../interfaces';
import { ActivityStatus } from '../constants';

@Injectable()
export default class AdapterService implements IAdapterService {
  private readonly logger = new Logger(AdapterService.name);

  constructor(private dataSource: DataSource) {}

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
      const orders = await queryRunner.manager.query(
        `SELECT id, status, currency, currency_symbol, date_created, date_created_gmt,
          date_modified, date_modified_gmt, date_completed, date_completed_gmt, memo, double_checked
        FROM \`order\` WHERE date_created_gmt>=? AND date_created_gmt<=?;`,
        [after, before],
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

  private async aggregateLineItems(queryRunner: QueryRunner, orderId: number, product_id: string): Promise<any[]> {
    const productIds = product_id.split(',');

    // 모든 관련 line_item_ids를 한 번에 가져옵니다.
    const lineItems = await queryRunner.manager.query(
      `SELECT li.id, li.\`key\`, li.value FROM \`line_item\` li
    JOIN \`line_item\` product_id_li ON li.order_id=product_id_li.order_id AND li.id=product_id_li.id
    WHERE li.order_id=? AND product_id_li.\`key\`='product_id' AND product_id_li.value IN (?);`,
      [orderId, productIds],
    );

    const lineItemMap = {};
    const bundledItemsMap = {};

    // lineItems을 처리하여 lineItemMap 및 bundledItemsMap을 구성합니다.
    lineItems.forEach((item) => {
      if (!lineItemMap[item.id]) {
        lineItemMap[item.id] = { id: item.id };
      }
      lineItemMap[item.id][item.key] = item.value;

      // 'bundled_items' 키를 확인하고 맵에 저장합니다.
      if (item.key.includes('bundled_items') && item.value) {
        bundledItemsMap[item.id] = item.value.split(',').map(Number);
      }
    });

    // bundledItemsMap에 있는 모든 bundled IDs에 대해 상세 정보를 가져옵니다.
    const allBundledIds = Object.values(bundledItemsMap).flat();
    if (allBundledIds.length > 0) {
      const bundledItemsDetails = await queryRunner.manager.query(`SELECT li.id, li.\`key\`, li.value FROM \`line_item\` li WHERE li.id IN (?) AND li.order_id=?;`, [allBundledIds, orderId]);

      // 결과를 처리하여 lineItemMap에 추가합니다.
      bundledItemsDetails.forEach((item) => {
        if (!lineItemMap[item.id]) {
          lineItemMap[item.id] = { id: item.id };
        }
        lineItemMap[item.id][item.key] = item.value;
      });
    }

    return Object.values(lineItemMap);
  }

  private async aggregateOrderDetails(queryRunner: QueryRunner, orderId: number): Promise<any> {
    const categories = ['order_metadata', 'billing', 'shipping', 'guest_house', 'jfk_oneway', 'jfk_shuttle_rt', 'h2o_usim', 'usim_info', 'snap_info', 'tour', 'tour_info'];
    const details = {};

    // 모든 카테고리에 대한 데이터를 한 번의 쿼리로 가져옵니다.
    const results = await queryRunner.manager.query(
      `SELECT category, \`key\`, value FROM (
      ${categories.map((category) => `SELECT '${category}' as category, \`key\`, value FROM \`${category}\` WHERE order_id=${orderId}`).join(' UNION ALL ')}
    ) as combined`,
    );

    // 결과를 기반으로 각 카테고리별로 데이터를 매핑합니다.
    results.forEach(({ category, key, value }) => {
      if (!details[category]) details[category] = {};
      details[category][key] = value;
    });

    return details;
  }

  private async aggregateLineItemDetails(queryRunner: QueryRunner, lineItemId: number): Promise<any> {
    const metadata = await queryRunner.manager.query(`SELECT \`key\`, value FROM \`line_item_metadata\` WHERE line_item_id=?;`, [lineItemId]);
    return metadata.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {});
  }

  async updateOrder(order_id: string, double_checked?: boolean, memo?: string) {
    console.log(order_id, double_checked, memo);

    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      if (double_checked !== undefined) {
        await queryRunner.manager.query(
          `UPDATE \`order\` SET
            double_checked=?, updated_at=NOW()
          WHERE id=?;`,
          [!!double_checked, order_id],
        );

        await queryRunner.manager.query(
          `INSERT INTO \`activity_log\` (
            order_id, user_id, activity, created_at, updated_at
          ) VALUES (?, ?, ?, NOW(), NOW());`,
          [order_id, 'seonghyunlee', ActivityStatus['CheckOrder']],
        );
      } else if (memo !== undefined) {
        await queryRunner.manager.query(
          `UPDATE \`order\` SET
            memo=?, updated_at=NOW()
          WHERE id=?;`,
          [memo, order_id],
        );

        // const existMemo = await queryRunner.manager.query(
        //   `SELECT 1 FROM \`activity_log\`
        //   WHERE id=? AND activity=?;`,
        //   [order_id, ActivityStatus['CreateMemo']],
        // );
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

  getActivityLogs() {
    throw new Error('Method not implemented.');
  }
}
