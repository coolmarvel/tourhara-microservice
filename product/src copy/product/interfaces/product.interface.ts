import { QueryRunner } from 'typeorm';

export default interface IProductService {
  select(queryRunner: QueryRunner, id: any): Promise<any>;

  insert(queryRunner: QueryRunner, product: any): Promise<any>;

  update(queryRunner: QueryRunner, product: any): Promise<any>;
}
