import { QueryRunner } from 'typeorm';

export default interface IOrderMetadataService {
  select(queryRunner: QueryRunner, orderId: bigint): Promise<any>;

  insert(queryRunner: QueryRunner, metadata: any, orderId: bigint): Promise<any>;

  update(queryRunner: QueryRunner, metadata: any, orderId: bigint): Promise<any>;
}
