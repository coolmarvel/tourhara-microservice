import { QueryRunner } from 'typeorm';

export default interface ISnapInfoService {
  select(queryRunner: QueryRunner, orderId: bigint): Promise<any>;

  insert(queryRunner: QueryRunner, snapInfo: any, orderId: bigint): Promise<any>;

  update(queryRunner: QueryRunner, snapInfo: any, orderId: bigint): Promise<any>;
}
