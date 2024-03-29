import { Injectable } from '@nestjs/common';
import { IPaymentProductionService } from '../interfaces/payment-production.interface';
import { QueryRunner } from 'typeorm';
import { Payment } from '../entities/payment.entity';

@Injectable()
export class PaymentProductionService implements IPaymentProductionService {
  async insert(queryRunner: QueryRunner, payment: any, orderId: string): Promise<any> {
    try {
      const existingOrderPayment = await queryRunner.manager.findOne(Payment, { where: { orderId: orderId } });
      if (existingOrderPayment) return true;

      const newOrderPayment = {
        paymentMethod: payment.paymentMethod === '' ? null : payment.paymentMethod,
        paymentMethodTitle: payment.paymentMethodTitle === '' ? null : payment.paymentMethodTitle,
        transactionId: payment.transactionId === '' ? null : payment.transactionId,
        paymentUrl: payment.paymentUrl === '' ? null : payment.paymentUrl,
        needsPayment: payment.needsPayment,
        needsProcessing: payment.needsProcessing,
        datePaid: payment.datePaid === '' ? null : payment.datePaid,
        datePaidGmt: payment.datePaidGmt === '' ? null : payment.datePaidGmt,
        orderId: orderId,
      };
      const orderPaymentEntity = queryRunner.manager.create(Payment, newOrderPayment);
      await queryRunner.manager.save(orderPaymentEntity);

      return true;
    } catch (error) {
      throw error;
    }
  }
}
