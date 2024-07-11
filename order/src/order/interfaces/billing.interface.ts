import { QueryRunner } from 'typeorm';

export default interface IBillingService {
  select(queryRunner: QueryRunner, orderId: bigint): Promise<any>;

  insert(queryRunner: QueryRunner, billing: any, orderId: bigint): Promise<any>;

  update(queryRunner: QueryRunner, billing: any, orderId: bigint): Promise<any>;
}
