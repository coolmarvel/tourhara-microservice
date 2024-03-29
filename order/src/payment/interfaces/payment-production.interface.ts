import { QueryRunner } from 'typeorm';

export interface IPaymentProductionService {
  insert(queryRunner: QueryRunner, payment: any, orderId: string): Promise<any>;
}
