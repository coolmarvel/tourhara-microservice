import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';

import { ISnapInfoService } from '../interfaces';
import { logger } from '../../common';

@Injectable()
export default class SnapInfoService implements ISnapInfoService {
  async select(queryRunner: QueryRunner, orderId: bigint): Promise<any> {
    try {
      throw new Error('Method not implemented.');
    } catch (error) {
      logger.error('');
      throw error;
    }
  }

  async insert(queryRunner: QueryRunner, snapInfo: any, orderId: bigint): Promise<any> {
    try {
      for (const key of Object.keys(snapInfo)) {
        const value = snapInfo[key];
        if (value !== '') {
          // Check if the record exists
          const existing = await queryRunner.manager.query(
            `SELECT 1 FROM \`snap_info\` 
            WHERE order_id=? AND \`key\`=?;`,
            [orderId, key],
          );

          // If exists update the record
          if (existing.length > 0) {
            await queryRunner.manager.query(
              `UPDATE \`snap_info\` SET 
                value=?, updated_at=NOW()
              WHERE order_id=? AND \`key\`=?;`,
              [value, orderId, key],
            );
            logger.info(`Updated snapInfo record for order_id=${orderId} and \`key\`=${key}.`);
          }
          // If not exists, insert the record
          else {
            await queryRunner.manager.query(
              `INSERT INTO \`snap_info\` (
                \`key\`, value, order_id, created_at, updated_at
              ) VALUES (?, ?, ?, NOW(), NOW());`,
              [key, value, orderId],
            );
            logger.info(`Inserted new snapInfo record for order_id=${orderId} and \`key\`=${key}.`);
          }
        }
      }
    } catch (error) {
      logger.error('SnapInfo Service Insert Error');
      throw error;
    }
  }

  async update(queryRunner: QueryRunner, snapInfo: any, orderId: bigint): Promise<any> {
    try {
      for (const key of Object.keys(snapInfo)) {
        const value = snapInfo[key];
        if (value !== '') {
          await queryRunner.manager.query(
            `UPDATE \`snap_info\` SET 
              value=?, updated_at=NOW() 
            WHERE order_id=? AND \`key\`=?`,
            [value, orderId, key],
          );
        } else {
          await queryRunner.manager.query(
            `DELETE FROM \`snap_info\` 
            WHERE order_id=? AND \`key\`=?`,
            [orderId, key],
          );
        }
      }
    } catch (error) {
      logger.error('SnapInfo Service Update Error');
      throw error;
    }
  }
}
