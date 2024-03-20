import { QueryRunner } from 'typeorm';

export interface IBillingService {
  saveBilling_prod(queryRunner: QueryRunner, orderId: string, billing: any): Promise<any>;
}
