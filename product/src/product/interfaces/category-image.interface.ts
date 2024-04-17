import { QueryRunner } from 'typeorm';

export interface ICategoryImageService {
  insert(queryRunner: QueryRunner, categoryImage: any, categoryId: string): Promise<any>;
}
