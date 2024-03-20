import { QueryRunner } from 'typeorm';

export interface IPaymentService {
  savePayment_prod(queryRunner: QueryRunner, orderId: string, payment: any): Promise<any>;
}
