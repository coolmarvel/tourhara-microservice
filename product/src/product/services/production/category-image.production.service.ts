import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { ICategoryImageService } from 'src/product/interfaces/category-image.interface';
import { QueryRunner } from 'typeorm';

@Injectable()
export class CategoryImageProductionService implements ICategoryImageService {
  async insert(queryRunner: QueryRunner, categoryImage: any, categoryId: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingCategoryImage = await queryRunner.manager.query(`SELECT * FROM \`product_category_image\` WHERE id=?;`, [categoryImage.id]);
        if (existingCategoryImage.length > 0) return resolve(await this.update(queryRunner, categoryImage, categoryId));

        const categoryImageId = uuid();
        await queryRunner.manager.query(
          `INSERT INTO \`product_category_image\` (
            product_category_image_id,id,name,src,alt,date_created,date_created_gmt,
            date_modified,date_modified_gmt,product_category_id,created_at,updated_at
          ) VALUES (?,?,?,?,?,?,?,?,?,?,NOW(),NOW());`,
          [
            categoryImageId,
            categoryImage.id,
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

        return resolve(categoryImageId);
      } catch (error) {
        console.error('CategoryImage Service Insert Error');
        console.error(error);
        return reject(error);
      }
    });
  }

  async update(queryRunner: QueryRunner, categoryImage: any, categoryId: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingCategoryImage = await queryRunner.manager.query(`SELECT * FROM \`product_category_image\` WHERE id=?;`, [categoryImage.id]);
        if (existingCategoryImage.length === 0) return resolve(await this.insert(queryRunner, categoryImage, categoryId));

        await queryRunner.manager.query(
          `UPDATE \`product_category_image\` SET 
            name=?,src=?,alt=?,date_created=?,date_created_gmt=?,date_modified=?,date_modified_gmt=?,updated_at=NOW()
          WHERE product_category_id=?;`,
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

        return resolve(existingCategoryImage[0].product_category_image_id);
      } catch (error) {
        console.error('CategoryImage Service Update Error');
        console.error(error);
        return reject(error);
      }
    });
  }
}
