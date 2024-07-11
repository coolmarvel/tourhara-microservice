import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';

import { IAttributeService } from '../interfaces';
import { logger } from '../../common';

@Injectable()
export default class AttributeService implements IAttributeService {
  async select(queryRunner: QueryRunner, attribute: any): Promise<any> {
    try {
      const result = await queryRunner.manager.query(
        `SELECT * FROM \`attribute\`
        WHERE id=? AND name=? AND position=? AND visible=? AND variation=? AND options=?;`,
        [BigInt(attribute.id), attribute.name, attribute.position, attribute.visible, attribute.variation, attribute.options.join(',')],
      );

      return result[0];
    } catch (error: any) {
      logger.error('Attribute Service Select Error');
      throw error;
    }
  }

  async insert(queryRunner: QueryRunner, attribute: any): Promise<any> {
    try {
      const exist = await queryRunner.manager.query(
        `SELECT * FROM \`attribute\` 
        WHERE id=? AND position=? AND visible=? AND variation=? AND options=?;`,
        [BigInt(attribute.id), attribute.name, attribute.position, attribute.visible, attribute.variation, attribute.options.join(',')],
      );
      if (exist.length > 0) return await this.update(queryRunner, attribute);

      await queryRunner.manager.query(
        `INSERT INTO \`attribute\` (
          id, name, position, visible, variation, options, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW());`,
        [BigInt(attribute.id), attribute.name, attribute.position, attribute.visible, attribute.variation, attribute.options.join(',')],
      );
    } catch (error: any) {
      logger.error('Attribute Service Insert Error');
      throw error;
    }
  }

  async update(queryRunner: QueryRunner, attribute: any): Promise<any> {
    try {
      await queryRunner.manager.query(
        `UPDATE \`attribute\` SET
          name=?, position=?, visible=?, variation=?, options=?, updated_at=NOW()
        WHERE id=?;`,
        [attribute.name, attribute.position, attribute.visible, attribute.variation, attribute.options.join(','), BigInt(attribute.id)],
      );

      return BigInt(attribute.id);
    } catch (error: any) {
      logger.error('Attribute Service Update Error');
      throw error;
    }
  }
}
