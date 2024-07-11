import { QueryRunner } from 'typeorm';

export default interface ITagService {
  select(queryRunner: QueryRunner, id: any): Promise<any>;

  insert(queryRunner: QueryRunner, tag: any): Promise<any>;

  update(queryRunner: QueryRunner, tag: any): Promise<any>;
}
