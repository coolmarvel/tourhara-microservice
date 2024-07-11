import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';

import { IShippingService } from '../interfaces';
import { logger } from '../../common';

@Injectable()
export default class ShippingService implements IShippingService {
  async select(queryRunner: QueryRunner, orderId: bigint): Promise<any> {
    try {
      throw new Error('Method not implemented.');
    } catch (error) {
      logger.error('');
      throw error;
    }
  }

  async insert(queryRunner: QueryRunner, shipping: any, orderId: bigint): Promise<any> {
    try {
      for (const key of Object.keys(shipping)) {
        const value = shipping[key];
        if (value !== '') {
          // Check if the record exists
          const existing = await queryRunner.manager.query(
            `SELECT 1 FROM \`shipping\` 
            WHERE order_id=? AND \`key\`=?;`,
            [orderId, key],
          );

          // If exists update the record
          if (existing.length > 0) {
            await queryRunner.manager.query(
              `UPDATE \`shipping\` SET 
                value=?, updated_at=NOW()
              WHERE order_id=? AND \`key\`=?;`,
              [value, orderId, key],
            );
            logger.info(`Updated shipping record for order_id=${orderId} and \`key\`=${key}.`);
          }
          // If not exists, insert the record
          else {
            await queryRunner.manager.query(
              `INSERT INTO \`shipping\` (
                \`key\`, value, order_id, created_at, updated_at
              ) VALUES (?, ?, ?, NOW(), NOW());`,
              [key, value, orderId],
            );
            logger.info(`Inserted new shipping record for order_id=${orderId} and \`key\`=${key}.`);
          }
        }
      }
    } catch (error) {
      logger.error('Shipping Service Insert Error');
      throw error;
    }
  }

  async update(queryRunner: QueryRunner, shipping: any, orderId: bigint): Promise<any> {
    try {
      for (const key of Object.keys(shipping)) {
        const value = shipping[key];
        if (value !== '') {
          await queryRunner.manager.query(
            `UPDATE \`shipping\` SET 
              value=?, updated_at=NOW() 
            WHERE order_id=? AND \`key\`=?`,
            [value, orderId, key],
          );
        } else {
          await queryRunner.manager.query(
            `DELETE FROM \`shipping\` 
            WHERE order_id=? AND \`key\`=?`,
            [orderId, key],
          );
        }
      }
    } catch (error) {
      logger.error('Shipping Service Update Error');
      throw error;
    }
  }
}
