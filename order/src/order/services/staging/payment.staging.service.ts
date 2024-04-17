import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { IPaymentService } from 'src/order/interfaces/payment.interface';
import { QueryRunner } from 'typeorm';

@Injectable()
export class PaymentStagingService implements IPaymentService {
  async insert(queryRunner: QueryRunner, payment: any, orderId: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingPayment = await queryRunner.manager.query(`
        SELECT order_id FROM \`payment\` WHERE order_id='${orderId}';`);
        if (existingPayment.length > 0) return resolve(true);

        const paymentId = uuid();
        await queryRunner.manager.query(`
        INSERT INTO \`payment\` (
          payment_id, payment_method, payment_method_title, transaction_id, payment_url,
          needs_payment, needs_processing, date_paid, date_paid_gmt, order_id, created_at, updated_at
        ) VALUES (
          '${paymentId}',
          ${payment.payment_method ? `'${payment.payment_method}'` : null},
          ${payment.payment_method_title ? `'${payment.payment_method_title}'` : null},
          ${payment.transaction_id ? `'${payment.transaction_id}'` : null},
          ${payment.payment_url ? `'${payment.payment_url}'` : null},
          ${payment.needs_payment === '' ? null : payment.needs_payment},
          ${payment.needs_processing === '' ? null : payment.needs_processing},
          ${payment.date_paid ? `'${payment.date_paid}'` : null},
          ${payment.date_paid_gmt ? `'${payment.date_paid_gmt}'` : null},
          '${orderId}', NOW(), NOW()
        );`);

        return resolve(paymentId);
      } catch (error) {
        console.error('Payment Service Insert Error');
        console.error(error);
        return reject(error);
      }
    });
  }
}
