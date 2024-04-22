import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { ILineItemMetadataService } from 'src/order/interfaces/line-item-metadata.interface';
import { QueryRunner } from 'typeorm';

@Injectable()
export class LineItemMetadataProductionService implements ILineItemMetadataService {
  async insert(queryRunner: QueryRunner, metadata: any, lineItemId: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingMetadata = await queryRunner.manager.query(`SELECT * FROM \`line_item_metadata\` WHERE id=?;`, [metadata.id]);
        if (existingMetadata.length > 0) return resolve(true);

        const lineItemMetadataId = uuid();
        await queryRunner.manager.query(
          `INSERT INTO \`line_item_metadata\` (
            line_item_metadata_id,id,\`key\`,\`value\`,line_item_id,created_at,updated_at
          ) VALUES (?,?,?,?,?,NOW(),NOW());`,
          [lineItemMetadataId, metadata.id, metadata.key, `'${metadata.value}'`, lineItemId],
        );

        return resolve(true);
      } catch (error) {
        console.error('LineItemMetadata Insert Error');
        console.error(error);
        return reject(error);
      }
    });
  }

  async update(queryRunner: QueryRunner, metadata: any, lineItemId: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingMetadata = await queryRunner.manager.query(`SELECT * FROM \`line_item_metadata\` WHERE id=?;`, [metadata.id]);
        if (existingMetadata.length === 0) return resolve(await this.insert(queryRunner, metadata, lineItemId));

        await queryRunner.manager.query(
          `UPDATE \`line_item_metadata\` SET 
            id=?,key=?,value=?,update_at=NOW()
          WHERE line_item_id=?;`,
          [metadata.id, metadata.key, `'${metadata.value}'`, lineItemId],
        );

        return resolve(true);
      } catch (error) {
        console.error('LineItemMetadata Service Update Error');
        console.error(error);
        return reject(error);
      }
    });
  }
}
