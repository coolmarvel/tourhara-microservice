import { QueryRunner } from 'typeorm';

export interface ILineItemService {
  insert(queryRunner: QueryRunner, lineItem: any, metadata: any, lineItemId: string, orderId: string): Promise<any>;
}
