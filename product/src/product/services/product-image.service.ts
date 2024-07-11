import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';

import { IProductImageService } from '../interfaces';
import { logger } from '../../common';

@Injectable()
export default class ProductImageService implements IProductImageService {
  async select(queryRunner: QueryRunner, id: any): Promise<any> {
    try {
      const productImage = await queryRunner.manager.query(`SELECT * FROM \`product_image\` WHERE id=?;`, [id]);

      return productImage[0];
    } catch (error: any) {
      logger.error('Product Image Service Select Error');
      throw error;
    }
  }

  async insert(queryRunner: QueryRunner, productImage: any): Promise<any> {
    try {
      const exist = await queryRunner.manager.query(`SELECT * FROM \`product_image\` WHERE id=?;`, [BigInt(productImage.id)]);
      if (exist.length > 0) return await this.update(queryRunner, productImage);

      await queryRunner.manager.query(
        `INSERT INTO \`product_image\` (
          id, name, src, alt, date_created, date_created_gmt,
          date_modified, date_modified_gmt, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW());`,
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
    } catch (error: any) {
      logger.error('Product Image Service Select Error');
      throw error;
    }
  }

  async update(queryRunner: QueryRunner, productImage: any): Promise<any> {
    try {
      await queryRunner.manager.query(
        `UPDATE \`product_image\` SET 
          name=?, src=?, alt=?, date_created_gmt=?, date_created_gmt=?,
          date_modified=?, date_modified_gmt=?, updated_at=NOW()
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

      return BigInt(productImage.id);
    } catch (error: any) {
      logger.error('Product Image Service Select Error');
      throw error;
    }
  }
}
