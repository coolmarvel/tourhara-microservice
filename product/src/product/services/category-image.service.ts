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
      if (exist.length > 0) return await this.update(queryRunner, categoryImage, categoryId);

      await queryRunner.manager.query(
        `INSERT INTO \`category_image\` (
          id, name, src, alt, date_created, date_created_gmt, date_modified,
          date_modified_gmt, category_id, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW());`,
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
          name=?, alt=?, date_created=?, date_created_gmt=?, date_modified=?, date_modified_gmt=?, updated_at=NOW()
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

      return BigInt(categoryImage.id);
    } catch (error: any) {
      logger.error('Category Image Service Update Error');
      throw error;
    }
  }
}
