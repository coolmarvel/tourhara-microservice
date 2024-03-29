import { QueryRunner } from 'typeorm';

export interface IBillingProductionService {
  insert(queryRunner: QueryRunner, billing: any, orderId: string): Promise<any>;
}
