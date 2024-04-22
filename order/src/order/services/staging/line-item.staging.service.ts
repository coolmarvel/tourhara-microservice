import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { ILineItemService } from 'src/order/interfaces/line-item.interface';
import { QueryRunner } from 'typeorm';

@Injectable()
export class LineItemStagingService implements ILineItemService {
  async insert(queryRunner: QueryRunner, lineItem: any, orderId: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingLineItem = await queryRunner.manager.query(`SELECT * FROM \`line_item\` WHERE id=?;`, [lineItem.id]);
        if (existingLineItem.length > 0) return resolve(true);

        const product = await queryRunner.manager.query(`SELECT * FROM \`product\` WHERE id=?;`, [lineItem.product_id]);
        const productImage = await queryRunner.manager.query(`SELECT * FROM \`product_image\` WHERE id=?;`, [lineItem.image.id]);

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

        const lineItemId = uuid();
        await queryRunner.manager.query(
          `INSERT INTO \`line_item\` (
            line_item_id,id,name,product_id,quantity,tax_class,total,subtotal,subtotal_tax,price,product_image_id,
            parent_name,bundled_by,bundled_item_title,bundled_items,order_id,created_at,updated_at
          ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW(),NOW());`,
          [
            lineItemId,
            lineItem.id,
            lineItemName,
            product[0].product_id,
            lineItem.quantity,
            lineItem.tax_class === '' ? null : lineItem.tax_class,
            lineItem.total,
            lineItem.subtotal,
            lineItem.subtotal_tax,
            lineItem.price,
            productImage.length === 0 ? null : productImage[0].product_image_id,
            lineItem.parent_name === null ? null : lineItem.parent_name,
            lineItem.bundled_by === '' ? null : lineItem.bundled_by,
            lineItemBundledItemTitle === '' ? null : lineItemBundledItemTitle,
            lineItem.bundled_items.length === 0 ? null : `'${lineItem.bundled_items}'`,
            orderId,
          ],
        );

        return resolve(lineItemId);
      } catch (error) {
        console.error('LineItem Service Insert Error');
        console.error(error);
        return reject(error);
      }
    });
  }

  async update(queryRunner: QueryRunner, lineItem: any, orderId: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingLineItem = await queryRunner.manager.query(`SELECT * FROM \`line_item\` WHERE id=?;`, [lineItem.id]);
        if (existingLineItem.length === 0) return resolve(await this.insert(queryRunner, lineItem, orderId));

        const product = await queryRunner.manager.query(`SELECT * FROM \`product\` WHERE id=?;`, [lineItem.product_id]);
        const productImage = await queryRunner.manager.query(`SELECT * FROM \`product_image\` WHERE id=?;`, [lineItem.image.id]);

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
            lineItem.id,
            lineItemName,
            product[0].product_id,
            lineItem.quantity,
            lineItem.tax_class === '' ? null : lineItem.tax_class,
            lineItem.total,
            lineItem.subtotal,
            lineItem.subtotal_tax,
            lineItem.price,
            productImage.length === 0 ? null : productImage[0].product_image_id,
            lineItem.parent_name === null ? null : lineItem.parent_name,
            lineItem.bundled_by === '' ? null : lineItem.bundled_by,
            lineItemBundledItemTitle === '' ? null : lineItemBundledItemTitle,
            lineItem.bundled_items.length === 0 ? null : `'${lineItem.bundled_items}'`,
            orderId,
          ],
        );

        return resolve(existingLineItem[0].line_item_id);
      } catch (error) {
        console.error('LineItem Service Update Error');
        console.error(error);
        return reject(error);
      }
    });
  }
}
