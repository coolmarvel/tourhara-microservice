import { Injectable } from '@nestjs/common';
import { IProductImageService } from 'src/product/interfaces/product-image.interface';
import { QueryRunner } from 'typeorm';
import { logger } from 'src/common/logger/logger.service';

@Injectable()
export class ProductImageProductionService implements IProductImageService {
  async insert(queryRunner: QueryRunner, productImage: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingProductImage = await queryRunner.manager.query(
          `SELECT * FROM \`product_image\` 
          WHERE id=?;`,
          [BigInt(productImage.id)],
        );
        if (existingProductImage.length > 0) return resolve(await this.update(queryRunner, productImage));

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
        const result = await queryRunner.manager.query(`SELECT LAST_INSERT_ID() as image_id;`);

        return resolve(BigInt(result[0].image_id));
      } catch (error) {
        logger.error('ProductImage Service Insert Error');
        logger.error(error);
        return reject(error);
      }
    });
  }

  async update(queryRunner: QueryRunner, productImage: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingProductImage = await queryRunner.manager.query(`SELECT * FROM \`product_image\` WHERE id=?;`, [BigInt(productImage.id)]);
        if (existingProductImage.length === 0) return resolve(await this.insert(queryRunner, productImage));

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

        return resolve(BigInt(existingProductImage[0].image_id));
      } catch (error) {
        logger.error('ProductImage Service Update Error');
        logger.error(error);
        return reject(error);
      }
    });
  }

  async select(queryRunner: QueryRunner, id: bigint): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const productImage = await queryRunner.manager.query(
          `SELECT * FROM \`product_image\` 
          WHERE id=?;`,
          [id],
        );

        return resolve(productImage[0]);
      } catch (error) {
        logger.error('ProductImage Service Select Error');
        logger.error(error);
        return reject(error);
      }
    });
  }
}
