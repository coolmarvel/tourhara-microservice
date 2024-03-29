import { QueryRunner } from 'typeorm';

export interface IPaymentStagingService {
  insert(queryRunner: QueryRunner, payment: any, orderId: string): Promise<any>;
}
