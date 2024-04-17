import { QueryRunner } from 'typeorm';

export interface ICheckListService {
  select(queryRunner: QueryRunner): Promise<any>;

  insert(queryRunner: QueryRunner, data: any): Promise<any>;

  update(queryRunner: QueryRunner, data: any): Promise<any>;
}
