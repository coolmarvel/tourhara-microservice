import { QueryRunner } from 'typeorm';
import { ProductTypeEnum } from '../constants/product-type.enum';

export interface ITypeService {
  insert(queryRunner: QueryRunner, type: ProductTypeEnum): Promise<any>;
}
