import { QueryRunner } from 'typeorm';

export default interface IPaymentService {
  select(queryRunner: QueryRunner, orderId: bigint): Promise<any>;

  insert(queryRunner: QueryRunner, payment: any, orderId: bigint): Promise<any>;

  update(queryRunner: QueryRunner, payment: any, orderId: bigint): Promise<any>;
}
