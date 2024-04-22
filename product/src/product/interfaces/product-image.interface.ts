import { QueryRunner } from 'typeorm';

export interface IProductImageService {
  insert(queryRunner: QueryRunner, productImage: any): Promise<any>;

  update(queryRunner: QueryRunner, productImage: any): Promise<any>;

  select(queryRunner: QueryRunner, id: number): Promise<any>;
}
