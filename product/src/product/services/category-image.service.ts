import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';

import { ICategoryImageService } from '../interfaces';
import { logger } from '../../common';

@Injectable()
export default class CategoryImageService implements ICategoryImageService {
  async select(queryRunner: QueryRunner, categoryImage: any, categoryId: any): Promise<any> {
    try {
      throw new Error('Method not implemented.');
    } catch (error: any) {
      logger.error('Category Image Service Select Error');
      throw error;
    }
  }

  async insert(queryRunner: QueryRunner, categoryImage: any, categoryId: any): Promise<any> {
    try {
      const exist = await queryRunner.manager.query(`SELECT * FROM \`category_image\` WHERE id=?;`, [BigInt(categoryImage.id)]);

      if (exist.length > 0) {
        await queryRunner.manager.query(
          `UPDATE \`category_image\` SET 
            name=?, src=?, alt=?, date_created=?, date_created_gmt=?, 
            date_modified=?, date_modified_gmt=?, updated_at=NOW()
          WHERE category_id=?;`,
          [
            categoryImage.name || null,
            categoryImage.src,
            categoryImage.alt || null,
            categoryImage.date_created || null,
            categoryImage.date_created_gmt || null,
            categoryImage.date_modified || null,
            categoryImage.date_modified_gmt || null,
            categoryId,
          ],
        );
        logger.info(`Updated category_image record for category_image_id=${exist[0].category_image_id}.`);
      } else {
        await queryRunner.manager.query(
          `INSERT INTO \`category_image\` (
            id, name, src, alt, date_created, date_created_gmt, date_modified,
            date_modified_gmt, category_id, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW());`,
          [
            BigInt(categoryImage.id),
            categoryImage.name || null,
            categoryImage.src,
            categoryImage.alt || null,
            categoryImage.date_created || null,
            categoryImage.date_created_gmt || null,
            categoryImage.date_modified || null,
            categoryImage.date_modified_gmt || null,
            categoryId,
          ],
        );
        logger.info(`Inserted new category_image record.`);
      }

      return BigInt(categoryImage.id);
    } catch (error: any) {
      logger.error('Category Image Service Insert Error');
      throw error;
    }
  }

  async update(queryRunner: QueryRunner, categoryImage: any, categoryId: any): Promise<any> {
    try {
      await queryRunner.manager.query(
        `UPDATE \`category_image\` SET 
          name=?, src=?, alt=?, date_created=?, date_created_gmt=?, 
          date_modified=?, date_modified_gmt=?, updated_at=NOW()
        WHERE category_id=?;`,
        [
          categoryImage.name || null,
          categoryImage.src,
          categoryImage.alt || null,
          categoryImage.date_created || null,
          categoryImage.date_created_gmt || null,
          categoryImage.date_modified || null,
          categoryImage.date_modified_gmt || null,
          categoryId,
        ],
      );

      return BigInt(categoryImage.id);
    } catch (error: any) {
      logger.error('Category Image Service Update Error');
      throw error;
    }
  }
}
