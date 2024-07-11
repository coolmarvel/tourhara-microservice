import { QueryRunner } from 'typeorm';

export default interface ICategoryImageService {
  select(queryRunner: QueryRunner, categoryImage: any, categoryId: any): Promise<any>;

  insert(queryRunner: QueryRunner, categoryImage: any, categoryId: any): Promise<any>;

  update(queryRunner: QueryRunner, categoryImage: any, categoryId: any): Promise<any>;
}
