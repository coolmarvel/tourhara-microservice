import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';

import { IProductImageService } from 'src/product/interfaces/product-image.interface';
import { logger } from 'src/common/logger/logger.service';

@Injectable()
export class ProductImageService implements IProductImageService {
  async insert(queryRunner: QueryRunner, productImage: any): Promise<any> {
    try {
      const existingProductImage = await queryRunner.manager.query(`SELECT * FROM \`product_image\` WHERE id=?;`, [BigInt(productImage.id)]);
      if (existingProductImage.length > 0) return await this.update(queryRunner, productImage);

      await queryRunner.manager.query(
        `INSERT INTO \`product_image\` (
            id,name,src,alt,date_created,date_created_gmt,
            date_modified,date_modified_gmt,created_at,updated_at
          ) VALUES (?,?,?,?,?,?,?,?,NOW(),NOW());`,
        [
          BigInt(productImage.id),
          productImage.name,
          productImage.src,
          productImage.alt === '' ? null : `'${productImage.alt}'`,
          productImage.date_created,
          productImage.date_created_gmt,
          productImage.date_modified,
          productImage.date_modified_gmt,
        ],
      );

      return BigInt(productImage.id);
    } catch (error) {
      logger.error('ProductImage Service Insert Error');
      logger.error(error);
      throw error;
    }
  }

  async update(queryRunner: QueryRunner, productImage: any): Promise<any> {
    try {
      const existingProductImage = await queryRunner.manager.query(`SELECT * FROM \`product_image\` WHERE id=?;`, [BigInt(productImage.id)]);
      if (existingProductImage.length === 0) return await this.insert(queryRunner, productImage);

      await queryRunner.manager.query(
        `UPDATE \`product_image\` SET 
            name=?,src=?,alt=?,date_created=?,date_created_gmt=?,
            date_modified=?,date_modified_gmt=?,updated_at=NOW()
          WHERE id=?;`,
        [
          productImage.name,
          productImage.src,
          productImage.alt === '' ? null : `'${productImage.alt}'`,
          productImage.date_created,
          productImage.date_created_gmt,
          productImage.date_modified,
          productImage.date_modified_gmt,
          BigInt(productImage.id),
        ],
      );

      return BigInt(existingProductImage[0].id);
    } catch (error) {
      logger.error('ProductImage Service Update Error');
      logger.error(error);
      throw error;
    }
  }

  async select(queryRunner: QueryRunner, id: bigint): Promise<any> {
    try {
      const productImage = await queryRunner.manager.query(`SELECT * FROM \`product_image\` WHERE id=?;`, [id]);

      return productImage[0];
    } catch (error) {
      logger.error('ProductImage Service Select Error');
      logger.error(error);
      throw error;
    }
  }
}
