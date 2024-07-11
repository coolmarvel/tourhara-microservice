import { QueryRunner } from 'typeorm';

export default interface ILineItemService {
  select(queryRunner: QueryRunner, orderId: bigint): Promise<any>;

  insert(queryRunner: QueryRunner, lineItem: any, orderId: bigint): Promise<any>;

  update(queryRunner: QueryRunner, lineItem: any, orderId: bigint): Promise<any>;
}
