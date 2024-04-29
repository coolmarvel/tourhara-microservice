import { QueryRunner } from 'typeorm';

export interface IBillingService {
  insert(queryRunner: QueryRunner, billing: any, orderId: bigint): Promise<any>;

  update(queryRunner: QueryRunner, billing: any, orderId: bigint): Promise<any>;
}
