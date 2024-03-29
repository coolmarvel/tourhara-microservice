import { QueryRunner } from 'typeorm';

export interface IShippingProductionService {
  insert(queryRunner: QueryRunner, shipping: any, orderId: string): Promise<any>;
}
