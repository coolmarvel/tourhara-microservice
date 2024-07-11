import { QueryRunner } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { IOrderService } from '../interfaces';
import { OrderStatus } from '../constants';
import { logger } from '../../common';

@Injectable()
export default class OrderService implements IOrderService {
  async select(queryRunner: QueryRunner, orderId: bigint): Promise<any> {
    try {
      throw new Error('Method not implemented.');
    } catch (error) {
      logger.error('');
      throw error;
    }
  }

  async insert(queryRunner: QueryRunner, order: any): Promise<any> {
    try {
      const existing = await queryRunner.manager.query(`SELECT order_id FROM \`order\` WHERE id=?;`, [order.id]);
      if (existing.length > 0) {
        await this.update(queryRunner, order);
        logger.info(`order record updated for order_id=${order.id}`);
      } else {
        await queryRunner.manager.query(
          `INSERT INTO \`order\` (
            id, status, currency, currency_symbol, date_created, date_created_gmt, date_modified,
            date_modified_gmt, date_completed, date_completed_gmt, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW());`,
          [
            order.id,
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
        logger.info(`New order record inserted for order_id=${order.id}`);
      }
    } catch (error) {
      logger.error('Order Service Insert Error');
      throw error;
    }
  }

  async update(queryRunner: QueryRunner, order: any): Promise<any> {
    try {
      await queryRunner.manager.query(
        `UPDATE \`order\` SET 
          status=?, date_modified=?, date_modified_gmt=?, date_completed=?,
          date_completed_gmt=?, updated_at=NOW()
        WHERE id=?;`,
        [
          OrderStatus[order.status.toUpperCase() as keyof typeof OrderStatus],
          order.date_modified === null ? null : order.date_modified,
          order.date_modified_gmt === null ? null : order.date_modified_gmt,
          order.date_completed === null ? null : order.date_completed,
          order.date_completed_gmt === null ? null : order.date_completed_gmt,
          order.id,
        ],
      );
    } catch (error) {
      logger.error('Order Service Update Error');
      throw error;
    }
  }
}
