import { QueryRunner } from 'typeorm';

export interface IBillingService {
  insert(queryRunner: QueryRunner, billing: any, orderId: string): Promise<any>;
}
