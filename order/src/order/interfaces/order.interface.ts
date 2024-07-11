import { QueryRunner } from 'typeorm';

export default interface IOrderService {
  /**
   * Database
   */
  select(queryRunner: QueryRunner, orderId: bigint): Promise<any>;

  insert(queryRunner: QueryRunner, order: any): Promise<any>;

  update(queryRunner: QueryRunner, order: any): Promise<any>;
}
