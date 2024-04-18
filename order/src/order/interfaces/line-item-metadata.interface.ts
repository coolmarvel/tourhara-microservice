import { QueryRunner } from 'typeorm';

export interface ILineItemMetadataService {
  insert(queryRunner: QueryRunner, metadata: any, lineItemId: string): Promise<any>;

  update(queryRunner: QueryRunner, metadata: any, lineItemId: string): Promise<any>;
}
