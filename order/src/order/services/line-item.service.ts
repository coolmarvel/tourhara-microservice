import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';

import { ILineItemService } from '../interfaces';
import { logger } from '../../common';

@Injectable()
export default class LineItemService implements ILineItemService {
  async select(queryRunner: QueryRunner, orderId: bigint): Promise<any> {
    try {
      throw new Error('Method not implemented.');
    } catch (error) {
      logger.error('');
      throw error;
    }
  }

  async insert(queryRunner: QueryRunner, lineItem: any, orderId: bigint): Promise<any> {
    try {
      const { id, name, product_id, variation_id, quantity, subtotal, subtotal_tax, total, total_tax, bundled_by, bundled_item_title, parent_name, taxes, bundled_items } = lineItem;

      const dataToInsert = [
        { key: 'name', value: this.extractText(name) },
        { key: 'product_id', value: product_id },
        { key: 'variation_id', value: variation_id },
        { key: 'quantity', value: quantity },
        { key: 'subtotal', value: subtotal },
        { key: 'subtotal_tax', value: subtotal_tax },
        { key: 'total', value: total },
        { key: 'total_tax', value: total_tax },
        { key: 'bundled_by', value: bundled_by ? bundled_by : null },
        { key: 'bundled_item_title', value: bundled_item_title ? this.extractText(bundled_item_title) : null },
        { key: 'parent_name', value: parent_name },
        { key: 'taxes', value: taxes.length > 0 ? JSON.stringify(taxes) : null },
        { key: 'bundled_items', value: bundled_items && bundled_items.length > 0 ? bundled_items.join(',') : null },
      ];

      for (const { key, value } of dataToInsert) {
        if (value !== null && value !== '') {
          const existing = await queryRunner.manager.query(`SELECT 1 FROM \`line_item\` WHERE order_id=? AND id=? AND \`key\`=?`, [orderId, id, key]);

          if (existing.length === 0) {
            await queryRunner.manager.query(
              `INSERT INTO \`line_item\` (
                order_id, id, \`key\`, value, created_at, updated_at
              ) VALUES (?, ?, ?, ?, NOW(), NOW())`,
              [orderId, id, key, value],
            );
            logger.info(`Inserted line item ${id} for order_id=${orderId} with key=${key}`);
          } else {
            await queryRunner.manager.query(
              `UPDATE \`line_item\` SET 
                value=?, updated_at=NOW()
              WHERE order_id=? AND id=? AND \`key\`=?`,
              [value, orderId, id, key],
            );
            logger.info(`Updated line item ${id} for order_id=${orderId} with key=${key}`);
          }
        }
      }
    } catch (error) {
      logger.error('LineItem Service Insert Error');
      throw error;
    }
  }

  async update(queryRunner: QueryRunner, lineItem: any, orderId: bigint): Promise<any> {
    try {
      const { id, name, product_id, variation_id, quantity, subtotal, subtotal_tax, total, total_tax, bundled_by, bundled_item_title, parent_name, taxes, bundled_items } = lineItem;

      const dataToUpdate = [
        { key: 'name', value: this.extractText(name) },
        { key: 'product_id', value: product_id },
        { key: 'variation_id', value: variation_id },
        { key: 'quantity', value: quantity },
        { key: 'subtotal', value: subtotal },
        { key: 'subtotal_tax', value: subtotal_tax },
        { key: 'total', value: total },
        { key: 'total_tax', value: total_tax },
        { key: 'bundled_by', value: bundled_by ? bundled_by : null },
        { key: 'bundled_item_title', value: bundled_item_title ? this.extractText(bundled_item_title) : null },
        { key: 'parent_name', value: parent_name },
        { key: 'taxes', value: taxes.length > 0 ? JSON.stringify(taxes) : null },
        { key: 'bundled_items', value: bundled_items && bundled_items.length > 0 ? bundled_items.join(',') : null },
      ];

      for (const { key, value } of dataToUpdate) {
        if (value !== null && value !== '') {
          await queryRunner.manager.query(
            `UPDATE \`line_item\` SET 
              value=?, updated_at=NOW() 
            WHERE order_id=? AND id=? AND \`key\`=?`,
            [value, orderId, id, key],
          );
          logger.info(`Updated line item ${id} for order_id=${orderId} with key=${key}`);
        }
      }
    } catch (error) {
      logger.error('LineItem Service Update Error');
      throw error;
    }
  }

  private extractText(htmlText: string): string {
    const textInsideTags = htmlText && htmlText.match(/<a [^>]*>(.*?)<\/a>/);

    return textInsideTags && textInsideTags.length > 1 ? textInsideTags[1].replace(/<img[^>]*>/g, '').trim() : htmlText.replace(/<\/?[^>]+(>|$)/g, '').trim();
  }
}
