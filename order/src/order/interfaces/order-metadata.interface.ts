import { QueryRunner } from 'typeorm';

export interface IOrderMetadataService {
  insert(queryRunner: QueryRunner, metadata: any, orderId: bigint): Promise<any>;

  update(queryRunner: QueryRunner, metadata: any, orderId: bigint): Promise<any>;
}
