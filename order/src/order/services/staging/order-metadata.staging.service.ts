import { Injectable } from '@nestjs/common';
import { IOrderMetadataService } from 'src/order/interfaces/order-metadata.interface';
import { QueryRunner } from 'typeorm';
import { logger } from 'src/common/logger/logger.service';

@Injectable()
export class OrderMetadataStagingService implements IOrderMetadataService {
  async insert(queryRunner: QueryRunner, metadata: any, orderId: bigint): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingMetadata = await queryRunner.manager.query(
          `SELECT * FROM \`order_metadata\` 
          WHERE id=?;`,
          [BigInt(metadata.id)],
        );
        if (existingMetadata.length > 0) return resolve(true);

        await queryRunner.manager.query(
          `INSERT INTO \`order_metadata\` (
            id,\`key\`,\`value\`,order_id,created_at,updated_at
          ) VALUES (?,?,?,?,NOW(),NOW());`,
          [BigInt(metadata.id), metadata.key, JSON.stringify(metadata.value), orderId],
        );

        return resolve(true);
      } catch (error) {
        logger.error('OrderMetadata Service Insert Error');
        logger.error(error);
        return reject(error);
      }
    });
  }

  async update(queryRunner: QueryRunner, metadata: any, orderId: bigint): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingMetadata = await queryRunner.manager.query(
          `SELECT * FROM \`order_metadata\` 
          WHERE id=?;`,
          [BigInt(metadata.id)],
        );
        if (existingMetadata.length === 0) return resolve(await this.insert(queryRunner, metadata, orderId));

        await queryRunner.manager.query(
          `UPDATE \`order_metadata\` SET
            id=?,key=?,value=?,updated_at=NOW()
          WHERE order_id=?;`,
          [BigInt(metadata.id), metadata.key, JSON.stringify(metadata.value), orderId],
        );

        return resolve(true);
      } catch (error) {
        logger.error('OrderMetadata Service Update Error');
        logger.error(error);
        return reject(error);
      }
    });
  }
}
