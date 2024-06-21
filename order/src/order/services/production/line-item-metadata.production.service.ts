import { Injectable } from '@nestjs/common';
import { ILineItemMetadataService } from 'src/order/interfaces/line-item-metadata.interface';
import { QueryRunner } from 'typeorm';
import { logger } from 'src/common/logger/logger.service';

@Injectable()
export class LineItemMetadataProductionService implements ILineItemMetadataService {
  insert(queryRunner: QueryRunner, metadata: any, lineItemId: bigint): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingMetadata = await queryRunner.manager.query(`SELECT * FROM \`line_item_metadata\` WHERE id=?;`, [BigInt(metadata.id)]);
        if (existingMetadata.length > 0) return resolve(true);

        if (typeof metadata.value === 'object') {
          // Array일 때
          if (Array.isArray(metadata.value)) {
            await queryRunner.manager.query(
              `INSERT INTO \`line_item_metadata\` (
                id,\`key\`,\`value\`,line_item_id,created_at,updated_at
              ) VALUES (?,?,?,?,NOW(),NOW());`,
              [BigInt(metadata.id), metadata.key, metadata.value.join(','), lineItemId],
            );
          }

          // JSON일 때
          if (!Array.isArray(metadata.value)) {
            for (const key of Object.keys(metadata.value)) {
              const value = metadata.value[key];

              const product = await queryRunner.manager.query(`SELECT * FROM \`product\` WHERE id=?;`, [BigInt(value.product_id)]);

              const titleMatches = value.title.match(/<a [^>]*>(.*?)<\/a>/);
              let title = titleMatches && titleMatches.length > 1 ? titleMatches[1] : value.title;
              title = title.replace(/<img[^>]*>/g, '').trim();

              let attributes = null;
              if (value.attributes) {
                attributes = Object.values(value.attributes);
                attributes = [...new Set(attributes)];
                attributes = attributes.join(',');
              }
              await queryRunner.manager.query(
                `INSERT INTO \`line_item_metadata\` (
                  id,\`key\`,product_id,quantity,title,optional_selected,attributes,
                  variation_id,discount,line_item_id,created_at,updated_at
                ) VALUES (?,?,?,?,?,?,?,?,?,?,NOW(),NOW());`,
                [
                  BigInt(metadata.id),
                  metadata.key,
                  product.length === 0 ? null : BigInt(product[0].id),
                  metadata.quantity,
                  title,
                  value.optional_selected,
                  attributes === '' ? null : attributes,
                  value.variation_id ? BigInt(value.variation_id) : null,
                  value.discount ? value.discount : null,
                  lineItemId,
                ],
              );
            }
          }
        } else {
          const valueMatches = metadata.value.match(/<a [^>]*>(.*?)<\/a>/);
          let value = valueMatches && valueMatches.length > 1 ? valueMatches[1] : metadata.value;
          value = value.replace(/<img[^>]*>/g, '').trim();

          await queryRunner.manager.query(
            `INSERT INTO \`line_item_metadata\` (
              id,\`key\`,\`value\`,line_item_id,created_at,updated_at
            ) VALUES (?,?,?,?,NOW(),NOW());`,
            [BigInt(metadata.id), metadata.key, value, lineItemId],
          );
        }

        return resolve(true);
      } catch (error) {
        logger.error('LineItemMetadata Insert Error');
        logger.error(error);
        return reject(error);
      }
    });
  }

  update(queryRunner: QueryRunner, metadata: any, lineItemId: bigint): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingMetadata = await queryRunner.manager.query(`SELECT * FROM \`line_item_metadata\` WHERE id=?;`, [BigInt(metadata.id)]);
        if (existingMetadata.length === 0) return resolve(await this.insert(queryRunner, metadata, lineItemId));

        if (typeof metadata.value === 'object') {
          // Array일 때
          if (Array.isArray(metadata.value)) {
            await queryRunner.manager.query(
              `UPDATE \`line_item_metadata\` SET 
                id=?,\`key\`=?,value=?,update_at=NOW()
              WHERE line_item_id=?;`,
              [BigInt(metadata.id), metadata.key, metadata.value.join(','), lineItemId],
            );
          }

          // JSON일 때
          if (!Array.isArray(metadata.value)) {
            for (const key of Object.keys(metadata.value)) {
              const value = metadata.value[key];

              const product = await queryRunner.manager.query(`SELECT * FROM \`product\` WHERE id=?;`, [BigInt(value.product_id)]);

              const titleMatches = value.title.match(/<a [^>]*>(.*?)<\/a>/);
              let title = titleMatches && titleMatches.length > 1 ? titleMatches[1] : value.title;
              title = title.replace(/<img[^>]*>/g, '').trim();

              let attributes = null;
              if (value.attributes) {
                attributes = Object.values(value.attributes);
                attributes = [...new Set(attributes)];
                attributes = attributes.join(',');
              }
              await queryRunner.manager.query(
                `UPDATE \`line_item_metadata\` SET 
                  id=?,\`key\`=?,product_id=?,quantity=?,title=?,optional_selected=?,
                  attributes=?,variation_id=?,discount=?,update_at=NOW()
                WHERE line_item_id=?;`,
                [
                  BigInt(metadata.id),
                  metadata.key,
                  product.length === 0 ? null : BigInt(product[0].id),
                  metadata.quantity,
                  title,
                  value.optional_selected,
                  attributes === '' ? null : attributes,
                  value.variation_id ? BigInt(value.variation_id) : null,
                  value.discount ? value.discount : null,
                  lineItemId,
                ],
              );
            }
          }
        } else {
          const valueMatches = metadata.value.match(/<a [^>]*>(.*?)<\/a>/);
          let value = valueMatches && valueMatches.length > 1 ? valueMatches[1] : metadata.value;
          value = value.replace(/<img[^>]*>/g, '').trim();

          await queryRunner.manager.query(
            `UPDATE \`line_item_metadata\` SET 
              id=?,\`key\`=?,value=?,update_at=NOW()
            WHERE line_item_id=?;`,
            [BigInt(metadata.id), metadata.key, value, lineItemId],
          );
        }

        // await queryRunner.manager.query(
        //   `UPDATE \`line_item_metadata\` SET
        //     id=?,\`key\`=?,value=?,update_at=NOW()
        //   WHERE line_item_id=?;`,
        //   [BigInt(BigInt(metadata.id)), metadata.key, JSON.stringify(metadata.value), lineItemId],
        // );

        return resolve(true);
      } catch (error) {
        logger.error('LineItemMetadata Service Update Error');
        logger.error(error);
        return reject(error);
      }
    });
  }
}
