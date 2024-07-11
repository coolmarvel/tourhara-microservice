import { QueryRunner } from 'typeorm';

export default interface IUsimInfoService {
  select(queryRunner: QueryRunner, orderId: bigint): Promise<any>;

  insert(queryRunner: QueryRunner, usimInfo: any, orderId: bigint): Promise<any>;

  update(queryRunner: QueryRunner, usimInfo: any, orderId: bigint): Promise<any>;
}
