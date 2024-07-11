import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';

import { IJfkOnewayService } from '../interfaces';
import { logger } from '../../common';

@Injectable()
export default class JfkOnewayService implements IJfkOnewayService {
  async select(queryRunner: QueryRunner, orderId: bigint): Promise<any> {
    try {
      throw new Error('Method not implemented.');
    } catch (error) {
      logger.error('');
      throw error;
    }
  }

  async insert(queryRunner: QueryRunner, jfkOneway: any, orderId: bigint): Promise<any> {
    try {
      for (const key of Object.keys(jfkOneway)) {
        const value = jfkOneway[key];
        if (value !== '') {
          // Check if the record exists
          const existing = await queryRunner.manager.query(
            `SELECT 1 FROM \`jfk_oneway\` 
            WHERE order_id=? AND \`key\`=?;`,
            [orderId, key],
          );

          // If exists update the record
          if (existing.length > 0) {
            await queryRunner.manager.query(
              `UPDATE \`jfk_oneway\` SET 
                value=?, updated_at=NOW()
              WHERE order_id=? AND \`key\`=?;`,
              [value, orderId, key],
            );
            logger.info(`Updated jfkOneway record for order_id=${orderId} and \`key\`=${key}.`);
          }
          // If not exists, insert the record
          else {
            await queryRunner.manager.query(
              `INSERT INTO \`jfk_oneway\` (
                \`key\`, value, order_id, created_at, updated_at
              ) VALUES (?, ?, ?, NOW(), NOW());`,
              [key, value, orderId],
            );
            logger.info(`Inserted new jfkOneway record for order_id=${orderId} and \`key\`=${key}.`);
          }
        }
      }
    } catch (error) {
      logger.error('JfkOneway Service Insert Error');
      throw error;
    }
  }

  async update(queryRunner: QueryRunner, jfkOneway: any, orderId: bigint): Promise<any> {
    try {
      for (const key of Object.keys(jfkOneway)) {
        const value = jfkOneway[key];
        if (value !== '') {
          await queryRunner.manager.query(
            `UPDATE \`jfk_oneway\` SET 
              value=?, updated_at=NOW() 
            WHERE order_id=? AND \`key\`=?`,
            [value, orderId, key],
          );
        } else {
          await queryRunner.manager.query(
            `DELETE FROM \`jfk_oneway\` 
            WHERE order_id=? AND \`key\`=?`,
            [orderId, key],
          );
        }
      }
    } catch (error) {
      logger.error('JfkOneway Service Update Error');
      throw error;
    }
  }
}
