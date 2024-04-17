import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { IProductImageService } from 'src/product/interfaces/product-image.interface';
import { QueryRunner } from 'typeorm';

@Injectable()
export class ProductImageProductionService implements IProductImageService {
  async insert(queryRunner: QueryRunner, productImage: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingProductImage = await queryRunner.manager.query(`
        SELECT id FROM \`product_image\` WHERE id='${productImage.id}';`);
        if (existingProductImage.length > 0) return resolve(true);

        const productImageId = uuid();
        await queryRunner.manager.query(`
        INSERT INTO \`product_image\` (
          product_image_id, id, name, src, alt, date_created, date_created_gmt,
          date_modified, date_modified_gmt, created_at, updated_at
        ) VALUES (
          '${productImageId}',
          '${productImage.id}',
          '${productImage.name}',
          '${productImage.src}',
          ${productImage.alt === '' ? null : `'${productImage.alt}'`},
          '${productImage.date_created}',
          '${productImage.date_created_gmt}',
          '${productImage.date_modified}',
          '${productImage.date_modified_gmt}',
          NOW(), NOW()
        );`);

        return resolve(productImageId);
      } catch (error) {
        console.error('ProductImage Service Insert Error');
        console.error(error);
        return reject(error);
      }
    });
  }

  async select(queryRunner: QueryRunner, id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const productImage = await queryRunner.manager.query(`
        SELECT * FROM \`product_image\` WHERE id='${id}';`);

        return resolve(productImage[0]);
      } catch (error) {
        console.error('ProductImage Service Select Error');
        console.error(error);
        return reject(error);
      }
    });
  }
}
