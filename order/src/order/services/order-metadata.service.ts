import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';

import { IOrderMetadataService } from '../interfaces/order-metadata.interface';
import { logger } from '../../common';

@Injectable()
export class OrderMetadataService implements IOrderMetadataService {
  async insert(queryRunner: QueryRunner, metadata: any, orderId: bigint): Promise<any> {
    try {
      const existingMetadata = await queryRunner.manager.query(`SELECT * FROM \`order_metadata\` WHERE id=?;`, [BigInt(metadata.id)]);
      if (existingMetadata.length > 0) return true;

      let value = null;
      if (metadata.key.includes('woo')) value = null;
      else value = metadata.value;

      await queryRunner.manager.query(
        `INSERT INTO \`order_metadata\` (
            id,\`key\`,\`value\`,order_id,created_at,updated_at
          ) VALUES (?,?,?,?,NOW(),NOW());`,
        [BigInt(metadata.id), metadata.key, value, orderId],
      );

      return true;
    } catch (error) {
      logger.error('OrderMetadata Service Insert Error');
      logger.error(error);
      throw error;
    }
  }

  async update(queryRunner: QueryRunner, metadata: any, orderId: bigint): Promise<any> {
    try {
      const existingMetadata = await queryRunner.manager.query(
        `SELECT * FROM \`order_metadata\` 
          WHERE id=?;`,
        [BigInt(metadata.id)],
      );
      if (existingMetadata.length === 0) return await this.insert(queryRunner, metadata, orderId);

      let value = null;
      if (metadata.key.includes('woo')) value = null;
      else value = metadata.value;

      await queryRunner.manager.query(
        `UPDATE \`order_metadata\` SET
            id=?,key=?,value=?,updated_at=NOW()
          WHERE order_id=?;`,
        [BigInt(metadata.id), metadata.key, value, orderId],
      );

      return true;
    } catch (error) {
      logger.error('OrderMetadata Service Update Error');
      logger.error(error);
      throw error;
    }
  }
}
