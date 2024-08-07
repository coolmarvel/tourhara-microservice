import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';

import { IOrderMetadataService } from '../interfaces';
import { logger } from '../../common';

@Injectable()
export default class OrderMetadataService implements IOrderMetadataService {
  async select(queryRunner: QueryRunner, orderId: bigint): Promise<any> {
    try {
      throw new Error('Method not implemented.');
    } catch (error) {
      logger.error('');
      throw error;
    }
  }

  async insert(queryRunner: QueryRunner, metadata: any, orderId: bigint): Promise<any> {
    try {
      const { id, key } = metadata;
      let value = metadata.value;

      if (typeof value === 'object' && value !== null) value = JSON.stringify(value);
      if (value !== '') {
        const existing = await queryRunner.manager.query(
          `SELECT 1 FROM \`order_metadata\` 
            WHERE order_id=? AND \`key\`=?;`,
          [orderId, key],
        );

        // If exists update the record
        if (existing.length > 0) {
          await queryRunner.manager.query(
            `UPDATE \`order_metadata\` SET 
                value=?, updated_at=NOW()
              WHERE order_id=? AND \`key\`=?;`,
            [value, orderId, key],
          );
          logger.info(`Updated metadata record for order_id=${orderId} and \`key\`=${key}.`);
        }
        // If not exists, insert the record
        else {
          await queryRunner.manager.query(
            `INSERT INTO \`order_metadata\` (
                id, \`key\`, value, order_id, created_at, updated_at
              ) VALUES (?, ?, ?, ?, NOW(), NOW());`,
            [id, key, value, orderId],
          );
          logger.info(`Inserted new metadata record for order_id=${orderId} and \`key\`=${key}.`);
        }
      }
    } catch (error) {
      logger.error('OrderMetadata Service Insert Error');
      throw error;
    }
  }

  async update(queryRunner: QueryRunner, metadata: any, orderId: bigint): Promise<any> {
    try {
      const { key } = metadata;
      let value = metadata.value;

      if (typeof value === 'object' && value !== null) value = JSON.stringify(value);
      if (value !== '') {
        await queryRunner.manager.query(
          `UPDATE \`order_metadata\` SET 
              value=?, updated_at=NOW() 
            WHERE order_id=? AND \`key\`=?;`,
          [value, orderId, key],
        );
      } else {
        await queryRunner.manager.query(
          `DELETE FROM \`order_metadata\` 
            WHERE order_id=? AND \`key\`=?;`,
          [orderId, key],
        );
      }
    } catch (error) {
      logger.error('OrderMetadata Service Update Error');
      throw error;
    }
  }
}
