import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { Payment } from '../entities/payment.entity';
import { IPaymentService } from '../interfaces/payment.interface';

@Injectable()
export class PaymentProductionService implements IPaymentService {
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
