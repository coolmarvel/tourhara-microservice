import { QueryRunner } from 'typeorm';

export default interface IShippingService {
  select(queryRunner: QueryRunner, orderId: bigint): Promise<any>;

  insert(queryRunner: QueryRunner, shipping: any, orderId: bigint): Promise<any>;

  update(queryRunner: QueryRunner, shipping: any, orderId: bigint): Promise<any>;
}
