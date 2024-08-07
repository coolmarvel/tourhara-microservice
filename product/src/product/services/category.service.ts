import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';

import { ICategoryService } from '../interfaces';
import { logger } from '../../common';

@Injectable()
export default class CategoryService implements ICategoryService {
  async select(queryRunner: QueryRunner, id: any): Promise<any> {
    try {
      const category = await queryRunner.manager.query(`SELECT * FROM \`category\` WHERE id=?;`, [id]);

      return category[0];
    } catch (error: any) {
      logger.error('Category Service Select Error');
      throw error;
    }
  }

  async insert(queryRunner: QueryRunner, category: any): Promise<any> {
    try {
      const exist = await queryRunner.manager.query(`SELECT * FROM \`category\` WHERE id=?`, [BigInt(category.id)]);

      if (exist.length > 0) {
        await queryRunner.manager.query(
          `UPDATE \`category\` SET
            parent=?, name=?, slug=?, updated_at=NOW() 
          WHERE id=?;`,
          [category.parent, category.name, category.slug, BigInt(category.id)],
        );
        logger.info(`Updated category record for category_id=${exist[0].category_id}.`);
      } else {
        await queryRunner.manager.query(
          `INSERT INTO \`category\` (
            id, parent, name, slug, created_at, updated_at
          ) VALUES (?, ?, ?, ?, NOW(), NOW());`,
          [BigInt(category.id), category.parent, category.name, category.slug],
        );
        logger.info(`Inserted new category record.`);
      }

      return BigInt(category.id);
    } catch (error: any) {
      logger.error('Category Service Insert Error');
      throw error;
    }
  }

  async update(queryRunner: QueryRunner, category: any): Promise<any> {
    try {
      await queryRunner.manager.query(
        `UPDATE \`category\` SET
           parent=?, name=?, slug=?, updated_at=NOW() 
        WHERE id=?;`,
        [category.parent, category.name, category.slug, BigInt(category.id)],
      );

      return BigInt(category.id);
    } catch (error: any) {
      logger.error('Category Service Update Error');
      throw error;
    }
  }
}
