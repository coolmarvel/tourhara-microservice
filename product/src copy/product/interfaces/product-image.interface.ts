import { QueryRunner } from 'typeorm';

export default interface IProductImageService {
  select(queryRunner: QueryRunner, id: any): Promise<any>;

  insert(queryRunner: QueryRunner, productImage: any): Promise<any>;

  update(queryRunner: QueryRunner, productImage: any): Promise<any>;
}
