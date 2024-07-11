import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';

import { IH2oUsimService } from '../interfaces';
import { logger } from '../../common';

@Injectable()
export default class H2oUsimService implements IH2oUsimService {
  async select(queryRunner: QueryRunner, orderId: bigint): Promise<any> {
    try {
      throw new Error('Method not implemented.');
    } catch (error) {
      logger.error('');
      throw error;
    }
  }

  async insert(queryRunner: QueryRunner, h2oUsim: any, orderId: bigint): Promise<any> {
    try {
      for (const key of Object.keys(h2oUsim)) {
        const value = h2oUsim[key];
        if (value !== '') {
          // Check if the record exists
          const existing = await queryRunner.manager.query(
            `SELECT 1 FROM \`h2o_usim\` 
            WHERE order_id=? AND \`key\`=?;`,
            [orderId, key],
          );

          // If exists update the record
          if (existing.length > 0) {
            await queryRunner.manager.query(
              `UPDATE \`h2o_usim\` SET 
                value=?, updated_at=NOW()
              WHERE order_id=? AND \`key\`=?;`,
              [value, orderId, key],
            );
            logger.info(`Updated h2oUsim record for order_id=${orderId} and \`key\`=${key}.`);
          }
          // If not exists, insert the record
          else {
            await queryRunner.manager.query(
              `INSERT INTO \`h2o_usim\` (
                \`key\`, value, order_id, created_at, updated_at
              ) VALUES (?, ?, ?, NOW(), NOW());`,
              [key, value, orderId],
            );
            logger.info(`Inserted new h2oUsim record for order_id=${orderId} and \`key\`=${key}.`);
          }
        }
      }
    } catch (error) {
      logger.error('H2oUsim Service Insert Error');
      throw error;
    }
  }

  async update(queryRunner: QueryRunner, h2oUsim: any, orderId: bigint): Promise<any> {
    try {
      for (const key of Object.keys(h2oUsim)) {
        const value = h2oUsim[key];
        if (value !== '') {
          await queryRunner.manager.query(
            `UPDATE \`h2o_usim\` SET 
              value=?, updated_at=NOW() 
            WHERE order_id=? AND \`key\`=?`,
            [value, orderId, key],
          );
        } else {
          await queryRunner.manager.query(
            `DELETE FROM \`h2o_usim\` 
            WHERE order_id=? AND \`key\`=?`,
            [orderId, key],
          );
        }
      }
    } catch (error) {
      logger.error('H2oUsim Service Update Error');
      throw error;
    }
  }
}
