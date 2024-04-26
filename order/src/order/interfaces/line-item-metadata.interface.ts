import { QueryRunner } from 'typeorm';

export interface ILineItemMetadataService {
  insert(queryRunner: QueryRunner, metadata: any, lineItemId: bigint): Promise<any>;

  update(queryRunner: QueryRunner, metadata: any, lineItemId: bigint): Promise<any>;
}
