import { QueryRunner } from 'typeorm';

export default interface IH2oUsimService {
  select(queryRunner: QueryRunner, orderId: bigint): Promise<any>;

  insert(queryRunner: QueryRunner, h2oUsim: any, orderId: bigint): Promise<any>;

  update(queryRunner: QueryRunner, h2oUsim: any, orderId: bigint): Promise<any>;
}
