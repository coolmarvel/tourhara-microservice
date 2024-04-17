import { QueryRunner } from 'typeorm';

export interface IOrderMetadataService {
  insert(queryRunner: QueryRunner, metadata: any, orderId: string): Promise<any>;
}
