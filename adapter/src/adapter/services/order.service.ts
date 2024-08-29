import { Injectable, Logger } from '@nestjs/common';
import { DataSource, QueryRunner, Repository } from 'typeorm';

import { IOrderService } from '../interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entities/orders/order.entity';
import { LineItem } from '../entities/orders/line-item.entity';
import { LineItemMetadata } from '../entities/orders/line-item-metadata.entity';

@Injectable()
export default class OrderService implements IOrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    private dataSource: DataSource,
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(LineItem) private lineItemRepository: Repository<LineItem>,
    @InjectRepository(LineItemMetadata) private lineItemMetadataRepository: Repository<LineItemMetadata>,
  ) {}

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
          date_modified, date_modified_gmt, date_completed, date_completed_gmt
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

  async getOrdersTemp(product_id: string, after: string, before: string): Promise<any> {
    this.trackMemoryUsage();

    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      const orders = await this.orderRepository
        .createQueryBuilder('order')
        .select([
          'order.id',
          'order.status',
          'order.currency',
          'order.currencySymbol',
          'order.dateCreated',
          'order.dateCreatedGmt',
          'order.dateModified',
          'order.dateModifiedGmt',
          'order.dateCompleted',
          'order.dateCompletedGmt',
        ])
        .where('order.dateCreatedGmt >= :after AND order.dateCreatedGmt <= :before', { after, before })
        .getMany();

      const formattedOrders = [];
      for (const order of orders) {
        const relevantLineItems = await this.aggregateLineItem(Number(order.id), product_id);
        if (relevantLineItems.length > 0) {
          const orderDetails = await this.aggregateOrderDetail(queryRunner, Number(order.id));
          for (const lineItem of relevantLineItems) {
            lineItem.meta_data = await this.aggregateLineItemDetail(queryRunner, lineItem.id);
          }

          const payment = await queryRunner.manager
            .createQueryBuilder('payment', 'p')
            .select(['p.payment_method', 'p.payment_method_title', 'p.transaction_id', 'p.payment_url', 'p.needs_payment'])
            .where('p.order_id = :orderId', { orderId: order.id })
            .getRawOne();

          formattedOrders.push({
            order: { ...order, meta_data: orderDetails.order_metadata },
            line_items: relevantLineItems,
            payment: payment || {},
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

  private async aggregateLineItem(orderId: number, product_id: string): Promise<any[]> {
    const productIds = product_id.split(',');

    // 모든 관련 line_item_ids를 쿼리 빌더를 사용하여 한 번에 가져옵니다.
    const lineItems = await this.lineItemRepository
      .createQueryBuilder('li')
      .select(['li.id', 'li.key', 'li.value'])
      .innerJoin(LineItem, 'product_id_li', 'li.orderId = product_id_li.orderId AND li.id = product_id_li.id')
      .where('li.orderId = :orderId', { orderId })
      .andWhere('product_id_li.key = :productKey', { productKey: 'product_id' })
      .andWhere('product_id_li.value IN (:...productIds)', { productIds })
      .getMany();

    const lineItemMap = {};
    const bundledItemsMap = {};

    // lineItems을 처리하여 lineItemMap 및 bundledItemsMap을 구성합니다.
    lineItems.forEach((item) => {
      if (!lineItemMap[item.id.toString()]) {
        lineItemMap[item.id.toString()] = { id: item.id };
      }
      lineItemMap[item.id.toString()][item.key] = item.value;

      // 'bundled_items' 키를 확인하고 맵에 저장합니다.
      if (item.key.includes('bundled_items') && item.value) {
        bundledItemsMap[item.id.toString()] = item.value.split(',').map(Number);
      }
    });

    // bundledItemsMap에 있는 모든 bundled IDs에 대해 상세 정보를 가져옵니다.
    const allBundledIds = Object.values(bundledItemsMap).flat();
    if (allBundledIds.length > 0) {
      const bundledItemsDetails = await this.lineItemRepository
        .createQueryBuilder('li')
        .select(['li.id', 'li.key', 'li.value'])
        .where('li.id IN (:...allBundledIds)', { allBundledIds })
        .andWhere('li.orderId = :orderId', { orderId })
        .getMany();

      // 결과를 처리하여 lineItemMap에 추가합니다.
      bundledItemsDetails.forEach((item) => {
        if (!lineItemMap[item.id.toString()]) {
          lineItemMap[item.id.toString()] = { id: item.id };
        }
        lineItemMap[item.id.toString()][item.key] = item.value;
      });
    }

    return Object.values(lineItemMap);
  }

  private async aggregateOrderDetail(queryRunner: QueryRunner, orderId: number): Promise<any> {
    const categories = ['order_metadata', 'billing', 'shipping', 'guest_house', 'jfk_oneway', 'jfk_shuttle_rt', 'h2o_usim', 'usim_info', 'snap_info', 'tour', 'tour_info'];
    const details: Record<string, Record<string, any>> = {};

    // 각 카테고리에 대해 개별적으로 서브쿼리를 생성하고 결합합니다.
    const subQueries = categories.map((category) =>
      queryRunner.manager
        .createQueryBuilder()
        .select(`'${category}'`, 'category') // 'category' 값을 문자열로 선택하고 별칭 지정
        .addSelect('`key`') // 'key' 컬럼을 백틱으로 감싸기
        .addSelect('`value`') // 'value' 컬럼을 백틱으로 감싸기
        .from(category, category)
        .where('order_id = :orderId', { orderId })
        .getQuery(),
    );

    // 각 서브쿼리를 UNION ALL로 결합하여 하나의 쿼리로 실행합니다.
    const combinedQuery = subQueries.join(' UNION ALL ');

    const results = await queryRunner.manager
      .createQueryBuilder()
      .select('*') // 최종 쿼리에서 모든 컬럼을 선택
      .from(`(${combinedQuery})`, 'combined')
      .setParameters({ orderId })
      .getRawMany();

    // 결과를 기반으로 각 카테고리별로 데이터를 매핑합니다.
    results.forEach(({ category, key, value }) => {
      if (!details[category]) {
        details[category] = {};
      }
      details[category][key] = value;
    });

    return details;
  }

  private async aggregateLineItemDetail(queryRunner: QueryRunner, lineItemId: number): Promise<any> {
    const metadata = await queryRunner.manager
      .createQueryBuilder()
      .select(['`key`', '`value`']) // `key`와 `value`를 백틱으로 감싸서 사용
      .from('line_item_metadata', 'metadata')
      .where('metadata.line_item_id = :lineItemId', { lineItemId })
      .getRawMany();

    return metadata.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {});
  }
}
