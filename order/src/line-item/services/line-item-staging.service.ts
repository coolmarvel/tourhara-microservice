import { Injectable } from '@nestjs/common';
import { ILineItemService } from '../interfaces/line-item.interface';
import { QueryRunner } from 'typeorm';
import { LineItem } from '../entities/line-item.entity';
import { Product } from '../entities/product.entity';
import { ProductImage } from 'src/order/entities/product-image.entity';
import { LineItemMetadata } from '../entities/line-item-metadata.entity';

@Injectable()
export class LineItemStagingService implements ILineItemService {
  async insert(queryRunner: QueryRunner, lineItem: any, orderId: string): Promise<any> {
    try {
      // line-item save
      const existingLineItem = await queryRunner.manager.findOne(LineItem, { where: { id: lineItem.id } });
      if (existingLineItem) return true;

      const product = await queryRunner.manager.findOne(Product, { where: { id: lineItem.product_id } });
      const productImage = await queryRunner.manager.findOne(ProductImage, { where: { id: lineItem.image.id } });

      // Step 1: Extract text inside <a> tags.
      const lineItemNameMatches = lineItem.name.match(/<a [^>]*>(.*?)<\/a>/);
      const lineItemBundledItemTitleMatches = lineItem.bundled_item_title.match(/<a [^>]*>(.*?)<\/a>/);

      let lineItemName = lineItem.name;
      let lineItemBundledItemTitle = lineItem.bundled_item_title;

      // If <a> tag is found, use the inner text. Otherwise, keep the original string.
      if (lineItemNameMatches && lineItemNameMatches.length > 1) {
        lineItemName = lineItemNameMatches[1];
      }

      if (lineItemBundledItemTitleMatches && lineItemBundledItemTitleMatches.length > 1) {
        lineItemBundledItemTitle = lineItemBundledItemTitleMatches[1];
      }

      // Step 2: Remove <img> tags from the extracted text.
      lineItemName = lineItemName.replace(/<img[^>]*>/g, '').trim();
      lineItemBundledItemTitle = lineItemBundledItemTitle.replace(/<img[^>]*>/g, '').trim();

      const newLineItem = {
        id: lineItem.id,
        name: lineItemName,
        productId: product.productId,
        quantity: lineItem.quantity,
        taxClass: lineItem.tax_class === '' ? null : lineItem.tax_class,
        total: lineItem.total,
        subtotal: lineItem.subtotal,
        subtotalTax: lineItem.subtotal_tax,
        price: lineItem.price,
        productImageId: productImage !== null ? productImage.productImageId : null,
        parentName: lineItem.parent_name,
        bundledBy: lineItem.bundled_by,
        bundledItemTitle: lineItemBundledItemTitle === '' ? null : lineItemBundledItemTitle,
        bundledItems: lineItem.bundled_items,
        orderId: orderId,
      };
      const lineItemEntity = queryRunner.manager.create(LineItem, newLineItem);
      const lineItemResult = await queryRunner.manager.save(lineItemEntity);
      const lineItemId = lineItemResult.lineItemId;

      // line-item-metadata save
      const metadatas = lineItem.meta_data;
      for (const metadata of metadatas) {
        const existingLineItemMetadata = await queryRunner.manager.findOne(LineItemMetadata, { where: { id: metadata.id } });
        if (existingLineItemMetadata) continue;

        const newLineItemMetadata = {
          id: metadata.id,
          key: metadata.key,
          value: metadata.value,
          lineItemId: lineItemId,
        };
        const lineItemMetadataEntity = queryRunner.manager.create(LineItemMetadata, newLineItemMetadata);
        await queryRunner.manager.save(lineItemMetadataEntity);
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}
