import { QueryRunner } from 'typeorm';

export interface ICategoryImageService {
  insert(queryRunner: QueryRunner, categoryImage: any, categoryId: bigint): Promise<any>;

  update(queryRunner: QueryRunner, categoryImage: any, categoryId: bigint): Promise<any>;
}
