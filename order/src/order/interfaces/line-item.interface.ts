import { QueryRunner } from 'typeorm';

export interface ILineItemService {
  insert(queryRunner: QueryRunner, lineItem: any, orderId: bigint): Promise<any>;

  update(queryRunner: QueryRunner, lineItem: any, orderId: bigint): Promise<any>;
}
