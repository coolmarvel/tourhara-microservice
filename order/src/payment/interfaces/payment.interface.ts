import { QueryRunner } from 'typeorm';

export interface IPaymentService {
  insert(queryRunner: QueryRunner, payment: any, orderId: string): Promise<any>;
}
