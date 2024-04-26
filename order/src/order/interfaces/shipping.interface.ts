import { QueryRunner } from 'typeorm';

export interface IShippingService {
  insert(queryRunner: QueryRunner, shipping: any, orderId: bigint): Promise<any>;

  update(queryRunner: QueryRunner, shipping: any, orderId: bigint): Promise<any>;
}
