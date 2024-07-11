import { QueryRunner } from 'typeorm';

export default interface ITourService {
  select(queryRunner: QueryRunner, orderId: bigint): Promise<any>;

  insert(queryRunner: QueryRunner, tour: any, orderId: bigint): Promise<any>;

  update(queryRunner: QueryRunner, tour: any, orderId: bigint): Promise<any>;
}
