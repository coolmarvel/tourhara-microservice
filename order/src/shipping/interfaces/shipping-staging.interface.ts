import { QueryRunner } from 'typeorm';

export interface IShippingStagingService {
  insert(queryRunner: QueryRunner, shipping: any, orderId: string): Promise<any>;
}
