import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { ProductTypeEnum } from 'src/product/constants/product-type.enum';
import { ITypeService } from 'src/product/interfaces/type.interface';
import { QueryRunner } from 'typeorm';

@Injectable()
export class TypeStagingService implements ITypeService {
  async insert(queryRunner: QueryRunner, type: ProductTypeEnum): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingType = await queryRunner.manager.query(`SELECT * FROM \`product_type\` WHERE type=?;`, [type]);
        if (existingType.length > 0) return resolve(true);

        const productTypeId = uuid();
        await queryRunner.manager.query(
          `INSERT INTO \`product_type\` (
            product_type_id,type,created_at,updated_at
          ) VALUES (?,?,NOW(),NOW());`,
          [productTypeId, type],
        );

        return resolve(true);
      } catch (error) {
        console.error('Type Service Insert Error');
        console.error(error);
        return reject(error);
      }
    });
  }
}
