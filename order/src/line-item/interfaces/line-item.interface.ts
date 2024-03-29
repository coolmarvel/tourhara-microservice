import { QueryRunner } from 'typeorm';

export interface ILineItemService {
  insert(queryRunner: QueryRunner, lineItem: any, metadata: any, orderId: string): Promise<any>;
}
