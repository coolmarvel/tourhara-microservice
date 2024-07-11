import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';

import { ILineItemMetadataService } from '../interfaces';
import { logger } from '../../common';

@Injectable()
export default class LineItemMetadataService implements ILineItemMetadataService {
  async select(queryRunner: QueryRunner, lineItemId: bigint): Promise<any> {
    try {
      throw new Error('Method not implemented.');
    } catch (error) {
      logger.error('');
      throw error;
    }
  }

  async insert(queryRunner: QueryRunner, metadata: any, lineItemId: bigint): Promise<any> {
    try {
      const { key, value } = metadata;
      if (key === '_stamp' || key.startsWith('display_')) return;

      const processedValue = Array.isArray(value) ? value.join(',') : this.extractText(value.toString());
      const existing = await queryRunner.manager.query(
        `SELECT 1 FROM \`line_item_metadata\`
        WHERE line_item_id=? AND \`key\`=?;`,
        [lineItemId, key],
      );
      if (existing.length === 0) {
        await queryRunner.manager.query(
          `INSERT INTO \`line_item_metadata\` (
            line_item_id, id, \`key\`, value, created_at, updated_at
          ) VALUES (?, ?, ?, ?, NOW(), NOW());`,
          [lineItemId, metadata.id, key, processedValue],
        );
        logger.info(`Inserted metadata for lineItemId=${lineItemId}, key=${key}`);
      } else {
        await queryRunner.manager.query(
          `UPDATE \`line_item_metadata\` SET 
          value=?, updated_at=NOW() 
          WHERE line_item_id=? AND \`key\`=?;`,
          [processedValue, lineItemId, key],
        );
        logger.info(`Updated metadata for lineItemId=${lineItemId}, key=${key}`);
      }
    } catch (error) {
      logger.error('LineItemMetadata Service Insert Error');
      throw error;
    }
  }

  async update(queryRunner: QueryRunner, metadata: any, lineItemId: bigint): Promise<any> {
    try {
      const { key, value } = metadata;
      if (key === '_stamp' || key.startsWith('display_')) return;

      const processedValue = Array.isArray(value) ? value.join(',') : this.extractText(value.toString());
      await queryRunner.manager.query(
        `UPDATE \`line_item_metadata\` SET 
          value=?, updated_at=NOW() 
          WHERE line_item_id=? AND \`key\`=?;`,
        [processedValue, lineItemId, key],
      );
    } catch (error) {
      logger.error('LineItemMetadata Service Update Error');
      throw error;
    }
  }

  private extractText(htmlText: string): string {
    const textInsideTags = htmlText.match(/<a [^>]*>(.*?)<\/a>/);

    return textInsideTags && textInsideTags.length > 1 ? textInsideTags[1].replace(/<img[^>]*>/g, '').trim() : htmlText.replace(/<\/?[^>]+(>|$)/g, '').trim();
  }
}
