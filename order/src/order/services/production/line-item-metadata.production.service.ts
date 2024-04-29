import { Injectable } from '@nestjs/common';
import { ILineItemMetadataService } from 'src/order/interfaces/line-item-metadata.interface';
import { QueryRunner } from 'typeorm';
import { logger } from 'src/common/logger/logger.service';

@Injectable()
export class LineItemMetadataProductionService implements ILineItemMetadataService {
  async insert(queryRunner: QueryRunner, metadata: any, lineItemId: bigint): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingMetadata = await queryRunner.manager.query(
          `SELECT * FROM \`line_item_metadata\` 
          WHERE id=?;`,
          [BigInt(metadata.id)],
        );
        if (existingMetadata.length > 0) return resolve(true);

        await queryRunner.manager.query(
          `INSERT INTO \`line_item_metadata\` (
            id,\`key\`,\`value\`,line_item_id,created_at,updated_at
          ) VALUES (?,?,?,?,NOW(),NOW());`,
          [BigInt(metadata.id), metadata.key, JSON.stringify(metadata.value), lineItemId],
        );

        return resolve(true);
      } catch (error) {
        logger.error('LineItemMetadata Insert Error');
        logger.error(error);
        return reject(error);
      }
    });
  }

  async update(queryRunner: QueryRunner, metadata: any, lineItemId: bigint): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingMetadata = await queryRunner.manager.query(
          `SELECT * FROM \`line_item_metadata\` 
          WHERE id=?;`,
          [BigInt(metadata.id)],
        );
        if (existingMetadata.length === 0) return resolve(await this.insert(queryRunner, metadata, lineItemId));

        await queryRunner.manager.query(
          `UPDATE \`line_item_metadata\` SET 
            id=?,key=?,value=?,update_at=NOW()
          WHERE line_item_id=?;`,
          [BigInt(BigInt(metadata.id)), metadata.key, JSON.stringify(metadata.value), lineItemId],
        );

        return resolve(true);
      } catch (error) {
        logger.error('LineItemMetadata Service Update Error');
        logger.error(error);
        return reject(error);
      }
    });
  }
}
