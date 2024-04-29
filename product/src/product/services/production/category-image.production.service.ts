import { Injectable } from '@nestjs/common';
import { ICategoryImageService } from 'src/product/interfaces/category-image.interface';
import { QueryRunner } from 'typeorm';
import { logger } from 'src/common/logger/logger.service';

@Injectable()
export class CategoryImageProductionService implements ICategoryImageService {
  async insert(queryRunner: QueryRunner, categoryImage: any, categoryId: bigint): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingCategoryImage = await queryRunner.manager.query(
          `SELECT * FROM \`category_image\` 
          WHERE id=?;`,
          [BigInt(categoryImage.id)],
        );
        if (existingCategoryImage.length > 0) return resolve(await this.update(queryRunner, categoryImage, categoryId));

        await queryRunner.manager.query(
          `INSERT INTO \`category_image\` (
            id,name,src,alt,date_created,date_created_gmt,date_modified,
            date_modified_gmt,category_id,created_at,updated_at
          ) VALUES (?,?,?,?,?,?,?,?,?,NOW(),NOW());`,
          [
            BigInt(categoryImage.id),
            categoryImage.name === '' ? null : categoryImage.name,
            categoryImage.src,
            categoryImage.alt === '' ? null : categoryImage.alt,
            categoryImage.date_created === null ? null : categoryImage.date_created,
            categoryImage.date_created_gmt === null ? null : categoryImage.date_created_gmt,
            categoryImage.date_modified === null ? null : categoryImage.date_modified,
            categoryImage.date_modified_gmt === null ? null : categoryImage.date_modified_gmt,
            categoryId,
          ],
        );
        const result = await queryRunner.manager.query(`SELECT LAST_INSERT_ID() as category_image_id;`);

        return resolve(BigInt(result[0].category_image_id));
      } catch (error) {
        logger.error('CategoryImage Service Insert Error');
        logger.error(error);
        return reject(error);
      }
    });
  }

  async update(queryRunner: QueryRunner, categoryImage: any, categoryId: bigint): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingCategoryImage = await queryRunner.manager.query(
          `SELECT * FROM \`category_image\` 
          WHERE id=?;`,
          [BigInt(categoryImage.id)],
        );
        if (existingCategoryImage.length === 0) return resolve(await this.insert(queryRunner, categoryImage, categoryId));

        await queryRunner.manager.query(
          `UPDATE \`category_image\` SET 
            name=?,src=?,alt=?,date_created=?,date_created_gmt=?,date_modified=?,date_modified_gmt=?,updated_at=NOW()
          WHERE category_id=?;`,
          [
            categoryImage.name === '' ? null : categoryImage.name,
            categoryImage.src,
            categoryImage.alt === '' ? null : categoryImage.alt,
            categoryImage.date_created === null ? null : categoryImage.date_created,
            categoryImage.date_created_gmt === null ? null : categoryImage.date_created_gmt,
            categoryImage.date_modified === null ? null : categoryImage.date_modified,
            categoryImage.date_modified_gmt === null ? null : categoryImage.date_modified_gmt,
            categoryId,
          ],
        );

        return resolve(BigInt(existingCategoryImage[0].category_image_id));
      } catch (error) {
        logger.error('CategoryImage Service Update Error');
        logger.error(error);
        return reject(error);
      }
    });
  }
}
