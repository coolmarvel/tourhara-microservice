import { QueryRunner } from 'typeorm';

export default interface IAttributeService {
  select(queryRunner: QueryRunner, attribute: any): Promise<any>;

  insert(queryRunner: QueryRunner, attribute: any): Promise<any>;

  update(queryRunner: QueryRunner, attribute: any): Promise<any>;
}
