import { Injectable } from '@nestjs/common';
import { IPaymentService } from '../interfaces/payment.interface';
import { QueryRunner } from 'typeorm';
import { Payment } from '../entities/payment.entity';

@Injectable()
export class PaymentService implements IPaymentService {
  async savePayment_prod(queryRunner: QueryRunner, orderId: string, payment: any): Promise<any> {
    try {
      await queryRunner.startTransaction();

      const existingOrderPayment = await queryRunner.manager.findOne(Payment, { where: { orderId: orderId } });
      if (existingOrderPayment) return true;

      const newOrderPayment = {
        paymentMethod: payment.paymentMethod == '' ? null : payment.paymentMethod,
        paymentMethodTitle: payment.paymentMethodTitle == '' ? null : payment.paymentMethodTitle,
        transactionId: payment.transactionId == '' ? null : payment.transactionId,
        paymentUrl: payment.paymentUrl == '' ? null : payment.paymentUrl,
        needsPayment: payment.needsPayment == '' ? null : payment.needsPayment,
        needsProcessing: payment.needsProcessing == '' ? null : payment.needsProcessing,
        datePaid: payment.datePaid == '' ? null : payment.paymentMethod,
        datePaidGmt: payment.datePaidGmt == '' ? null : payment.paymentMethod,
        orderId: orderId,
      };
      const orderPaymentEntity = queryRunner.manager.create(Payment, newOrderPayment);
      await queryRunner.manager.save(orderPaymentEntity);

      await queryRunner.commitTransaction();

      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }
}
