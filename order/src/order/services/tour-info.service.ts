import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';

import { ITourInfoService } from '../interfaces';
import { logger } from '../../common';

@Injectable()
export default class TourInfoService implements ITourInfoService {
  async select(queryRunner: QueryRunner, orderId: bigint): Promise<any> {
    try {
      throw new Error('Method not implemented.');
    } catch (error) {
      logger.error('');
      throw error;
    }
  }

  async insert(queryRunner: QueryRunner, tourInfo: any, orderId: bigint): Promise<any> {
    try {
      for (const key of Object.keys(tourInfo)) {
        const value = tourInfo[key];
        if (value !== '') {
          // Check if the record exists
          const existing = await queryRunner.manager.query(
            `SELECT 1 FROM \`tour_info\` 
            WHERE order_id=? AND \`key\`=?;`,
            [orderId, key],
          );

          // If exists update the record
          if (existing.length > 0) {
            await queryRunner.manager.query(
              `UPDATE \`tour_info\` SET 
                value=?, updated_at=NOW()
              WHERE order_id=? AND \`key\`=?;`,
              [value, orderId, key],
            );
            logger.info(`Updated tourInfo record for order_id=${orderId} and \`key\`=${key}.`);
          }
          // If not exists, insert the record
          else {
            await queryRunner.manager.query(
              `INSERT INTO \`tour_info\` (
                \`key\`, value, order_id, created_at, updated_at
              ) VALUES (?, ?, ?, NOW(), NOW());`,
              [key, value, orderId],
            );
            logger.info(`Inserted new tourInfo record for order_id=${orderId} and \`key\`=${key}.`);
          }
        }
      }
    } catch (error) {
      logger.error('TourInfo Service Insert Error');
      throw error;
    }
  }

  async update(queryRunner: QueryRunner, tourInfo: any, orderId: bigint): Promise<any> {
    try {
      for (const key of Object.keys(tourInfo)) {
        const value = tourInfo[key];
        if (value !== '') {
          await queryRunner.manager.query(
            `UPDATE \`tour_info\` SET 
              value=?, updated_at=NOW() 
            WHERE order_id=? AND \`key\`=?`,
            [value, orderId, key],
          );
        } else {
          await queryRunner.manager.query(
            `DELETE FROM \`tour_info\` 
            WHERE order_id=? AND \`key\`=?`,
            [orderId, key],
          );
        }
      }
    } catch (error) {
      logger.error('TourInfo Service Update Error');
      throw error;
    }
  }
}
