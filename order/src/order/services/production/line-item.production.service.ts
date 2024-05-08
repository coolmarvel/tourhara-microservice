import { Injectable } from '@nestjs/common';
import { ILineItemService } from 'src/order/interfaces/line-item.interface';
import { QueryRunner } from 'typeorm';
import { logger } from 'src/common/logger/logger.service';

@Injectable()
export class LineItemProductionService implements ILineItemService {
  async insert(queryRunner: QueryRunner, lineItem: any, orderId: bigint): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingLineItem = await queryRunner.manager.query(
          `SELECT * FROM \`line_item\` 
          WHERE id=?;`,
          [BigInt(lineItem.id)],
        );
        if (existingLineItem.length > 0) return resolve(true);

        const product = await queryRunner.manager.query(
          `SELECT * FROM \`product\` 
          WHERE id=?;`,
          [BigInt(lineItem.product_id)],
        );
        const productImage = await queryRunner.manager.query(
          `SELECT * FROM \`product_image\` 
          WHERE id=?;`,
          [BigInt(lineItem.image.id)],
        );

        // Step 1: Extract text inside <a> tags.
        const lineItemNameMatches = lineItem.name.match(/<a [^>]*>(.*?)<\/a>/);
        const lineItemBundledItemTitleMatches = lineItem.bundled_item_title.match(/<a [^>]*>(.*?)<\/a>/);

        let lineItemName = lineItem.name;
        let lineItemBundledItemTitle = lineItem.bundled_item_title;

        // If <a> tag is found, use the inner text. Otherwise, keep the original string.
        if (lineItemNameMatches && lineItemNameMatches.length > 1) lineItemName = lineItemNameMatches[1];
        if (lineItemBundledItemTitleMatches && lineItemBundledItemTitleMatches.length > 1) lineItemBundledItemTitle = lineItemBundledItemTitleMatches[1];

        // Step 2: Remove <img> tags from the extracted text.
        lineItemName = lineItemName.replace(/<img[^>]*>/g, '').trim();
        lineItemBundledItemTitle = lineItemBundledItemTitle.replace(/<img[^>]*>/g, '').trim();

        await queryRunner.manager.query(
          `INSERT INTO \`line_item\` (
            id,name,product_id,quantity,tax_class,total,subtotal,subtotal_tax,price,product_image_id,
            parent_name,bundled_by,bundled_item_title,bundled_items,order_id,created_at,updated_at
          ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW(),NOW());`,
          [
            BigInt(lineItem.id),
            lineItemName,
            BigInt(product[0].product_id),
            lineItem.quantity,
            lineItem.tax_class === '' ? null : lineItem.tax_class,
            lineItem.total,
            lineItem.subtotal,
            lineItem.subtotal_tax,
            lineItem.price,
            productImage.length === 0 ? null : BigInt(productImage[0].image_id),
            lineItem.parent_name === null ? null : lineItem.parent_name,
            lineItem.bundled_by === '' ? null : lineItem.bundled_by,
            lineItemBundledItemTitle === '' ? null : lineItemBundledItemTitle,
            lineItem.bundled_items.length === 0 ? null : lineItem.bundled_items.join(','),
            orderId,
          ],
        );
        const result = await queryRunner.manager.query(`SELECT LAST_INSERT_ID() as line_item_id;`);

        return resolve(BigInt(result[0].line_item_id));
      } catch (error) {
        logger.error('LineItem Service Insert Error');
        logger.error(error);
        return reject(error);
      }
    });
  }

  async update(queryRunner: QueryRunner, lineItem: any, orderId: bigint): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingLineItem = await queryRunner.manager.query(
          `SELECT * FROM \`line_item\` 
          WHERE id=?;`,
          [BigInt(lineItem.id)],
        );
        if (existingLineItem.length === 0) return resolve(await this.insert(queryRunner, lineItem, orderId));

        const product = await queryRunner.manager.query(
          `SELECT * FROM \`product\` 
          WHERE id=?;`,
          [BigInt(lineItem.product_id)],
        );
        const productImage = await queryRunner.manager.query(
          `SELECT * FROM \`product_image\` 
          WHERE id=?;`,
          [BigInt(lineItem.image.id)],
        );

        // Step 1: Extract text inside <a> tags.
        const lineItemNameMatches = lineItem.name.match(/<a [^>]*>(.*?)<\/a>/);
        const lineItemBundledItemTitleMatches = lineItem.bundled_item_title.match(/<a [^>]*>(.*?)<\/a>/);

        let lineItemName = lineItem.name;
        let lineItemBundledItemTitle = lineItem.bundled_item_title;

        // If <a> tag is found, use the inner text. Otherwise, keep the original string.
        if (lineItemNameMatches && lineItemNameMatches.length > 1) lineItemName = lineItemNameMatches[1];
        if (lineItemBundledItemTitleMatches && lineItemBundledItemTitleMatches.length > 1) lineItemBundledItemTitle = lineItemBundledItemTitleMatches[1];

        // Step 2: Remove <img> tags from the extracted text.
        lineItemName = lineItemName.replace(/<img[^>]*>/g, '').trim();
        lineItemBundledItemTitle = lineItemBundledItemTitle.replace(/<img[^>]*>/g, '').trim();

        await queryRunner.manager.query(
          `UPDATE \`line_item\` SET 
            id=?,name=?,product_id=?,quantity=?,tax_class=?,total=?,subtotal=?,subtotal_tax=?,price=?,
            product_image_id=?,parent_name=?,bundled_by=?,bundled_item_title=?,bundled_items=?,updated_at=NOW()
          WHERE order_id=?;`,
          [
            BigInt(lineItem.id),
            lineItemName,
            BigInt(product[0].product_id),
            lineItem.quantity,
            lineItem.tax_class === '' ? null : lineItem.tax_class,
            lineItem.total,
            lineItem.subtotal,
            lineItem.subtotal_tax,
            lineItem.price,
            productImage.length === 0 ? null : BigInt(productImage[0].image_id),
            lineItem.parent_name === null ? null : lineItem.parent_name,
            lineItem.bundled_by === '' ? null : lineItem.bundled_by,
            lineItemBundledItemTitle === '' ? null : lineItemBundledItemTitle,
            lineItem.bundled_items.length === 0 ? null : lineItem.bundled_items.join(','),
            orderId,
          ],
        );

        return resolve(BigInt(existingLineItem[0].line_item_id));
      } catch (error) {
        logger.error('LineItem Service Update Error');
        logger.error(error);
        return reject(error);
      }
    });
  }
}
