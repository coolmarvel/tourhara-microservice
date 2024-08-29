import { QueryRunner } from 'typeorm';

export default interface ICategoryService {
  select(queryRunner: QueryRunner, id: any): Promise<any>;

  insert(queryRunner: QueryRunner, category: any): Promise<any>;

  update(queryRunner: QueryRunner, category: any): Promise<any>;
}
