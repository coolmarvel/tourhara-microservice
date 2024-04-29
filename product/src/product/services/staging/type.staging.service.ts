import { Injectable } from '@nestjs/common';
import { ProductTypeEnum } from 'src/product/constants/product-type.enum';
import { ITypeService } from 'src/product/interfaces/type.interface';
import { QueryRunner } from 'typeorm';
import { logger } from 'src/common/logger/logger.service';

@Injectable()
export class TypeStagingService implements ITypeService {
  async insert(queryRunner: QueryRunner, type: ProductTypeEnum): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingType = await queryRunner.manager.query(
          `SELECT * FROM \`type\` 
          WHERE type=?;`,
          [type],
        );
        if (existingType.length > 0) return resolve(true);

        await queryRunner.manager.query(
          `INSERT INTO \`type\` (
            type,created_at,updated_at
          ) VALUES (?,NOW(),NOW());`,
          [type],
        );

        return resolve(true);
      } catch (error) {
        logger.error('Type Service Insert Error');
        logger.error(error);
        return reject(error);
      }
    });
  }
}
