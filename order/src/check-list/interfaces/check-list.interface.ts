import { QueryRunner } from 'typeorm';

export interface ICheckListService {
  insert(queryRunner: QueryRunner, data: any): Promise<any>;

  update(queryRunner: QueryRunner, data: any): Promise<any>;

  select(queryRunner: QueryRunner): Promise<any>;
}
