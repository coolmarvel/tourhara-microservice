import { QueryRunner } from 'typeorm';

export default interface ILineItemMetadataService {
  select(queryRunner: QueryRunner, lineItemId: bigint): Promise<any>;

  insert(queryRunner: QueryRunner, metadata: any, lineItemId: bigint): Promise<any>;

  update(queryRunner: QueryRunner, metadata: any, lineItemId: bigint): Promise<any>;
}
