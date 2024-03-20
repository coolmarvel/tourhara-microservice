import { QueryRunner } from 'typeorm';

export interface IShippingService {
  saveShipping_prod(queryRunner: QueryRunner, orderId: string, shipping: any): Promise<any>;
}
