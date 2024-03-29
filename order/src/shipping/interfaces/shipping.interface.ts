import { QueryRunner } from 'typeorm';

export interface IShippingService {
  insert(queryRunner: QueryRunner, shipping: any, orderId: string): Promise<any>;
}
