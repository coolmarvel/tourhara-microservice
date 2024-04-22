import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { IOrderMetadataService } from 'src/order/interfaces/order-metadata.interface';
import { QueryRunner } from 'typeorm';

@Injectable()
export class OrderMetadataStagingService implements IOrderMetadataService {
  async insert(queryRunner: QueryRunner, metadata: any, orderId: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingMetadata = await queryRunner.manager.query(`SELECT * FROM \`order_metadata\` WHERE id=?;`, [metadata.id]);
        if (existingMetadata.length > 0) return resolve(true);

        const orderMetadataId = uuid();
        await queryRunner.manager.query(
          `INSERT INTO \`order_metadata\` (
            order_metadata_id,id,\`key\`,\`value\`,order_id,created_at,updated_at
          ) VALUES (?,?,?,?,?,NOW(),NOW());`,
          [orderMetadataId, metadata.id, metadata.key, `'${metadata.value}'`, orderId],
        );

        return resolve(true);
      } catch (error) {
        console.error('OrderMetadata Service Insert Error');
        console.error(error);
        return reject(error);
      }
    });
  }

  async update(queryRunner: QueryRunner, metadata: any, orderId: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingMetadata = await queryRunner.manager.query(`SELECT * FROM \`order_metadata\` WHERE id=?;`, [metadata.id]);
        if (existingMetadata.length === 0) return resolve(await this.insert(queryRunner, metadata, orderId));

        await queryRunner.manager.query(
          `UPDATE \`order_metadata\` SET
            id=?,key=?,value=?,updated_at=NOW()
          WHERE order_id=?;`,
          [metadata.id, metadata.key, `'${metadata.value}'`, orderId],
        );

        return resolve(true);
      } catch (error) {
        console.error('OrderMetadata Service Update Error');
        console.error(error);
        return reject(error);
      }
    });
  }
}
