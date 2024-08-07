import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';

import { ITagService } from '../interfaces';
import { logger } from '../../common';

@Injectable()
export default class TagService implements ITagService {
  async select(queryRunner: QueryRunner, id: any): Promise<any> {
    try {
      const tag = await queryRunner.manager.query(`SELECT * FROM \`tag\` WHERE id=?;`, [id]);

      return tag[0];
    } catch (error: any) {
      logger.error('Tag Service Select Error');
      throw error;
    }
  }

  async insert(queryRunner: QueryRunner, tag: any): Promise<any> {
    try {
      const exist = await queryRunner.manager.query(`SELECT * FROM \`tag\` WHERE id=?;`, [BigInt(tag.id)]);
      if (exist.length > 0) {
        await queryRunner.manager.query(
          `UPDATE \`tag\` SET
            name=?, slug=?, count=?, updated_at=NOW()
          WHERE id=?;`,
          [tag.name === '' ? null : tag.name, tag.slug === '' ? null : tag.slug, tag.count, BigInt(tag.id)],
        );
        logger.info(`Updated tag record for tag_id=${exist[0].tag_id}.`);
      } else {
        await queryRunner.manager.query(
          `INSERT INTO \`tag\` (
            id, name, slug, count, created_at, updated_at
          ) VALUES (?, ?, ?, ?, NOW(), NOW());`,
          [BigInt(tag.id), tag.name === '' ? null : tag.name, tag.slug === '' ? null : tag.slug, tag.count],
        );
        logger.info(`Inserted new tag record.`);
      }

      return BigInt(tag.id);
    } catch (error: any) {
      logger.error('Tag Service Select Error');
      throw error;
    }
  }

  async update(queryRunner: QueryRunner, tag: any): Promise<any> {
    try {
      await queryRunner.manager.query(
        `UPDATE \`tag\` SET
          name=?, slug=?, count=?, updated_at=NOW()
        WHERE id=?;`,
        [tag.name === '' ? null : tag.name, tag.slug === '' ? null : tag.slug, tag.count, BigInt(tag.id)],
      );

      return BigInt(tag.id);
    } catch (error: any) {
      logger.error('Tag Service Select Error');
      throw error;
    }
  }
}
