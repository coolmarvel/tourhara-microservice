import { QueryRunner } from 'typeorm';

export interface IPaymentService {
  insert(queryRunner: QueryRunner, payment: any, orderId: bigint): Promise<any>;

  update(queryRunner: QueryRunner, payment: any, orderId: bigint): Promise<any>;
}
