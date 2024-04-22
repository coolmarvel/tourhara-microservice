import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { IPaymentService } from 'src/order/interfaces/payment.interface';
import { QueryRunner } from 'typeorm';

@Injectable()
export class PaymentStagingService implements IPaymentService {
  async insert(queryRunner: QueryRunner, payment: any, orderId: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingPayment = await queryRunner.manager.query(`SELECT * FROM \`payment\` WHERE order_id=?;`, [orderId]);
        if (existingPayment.length > 0) return resolve(true);

        const paymentId = uuid();
        await queryRunner.manager.query(
          `INSERT INTO \`payment\` (
            payment_id,payment_method,payment_method_title,transaction_id,payment_url,
            needs_payment,needs_processing,date_paid,date_paid_gmt,order_id,created_at,updated_at
          ) VALUES (?,?,?,?,?,?,?,?,?,?,NOW(),NOW());`,
          [
            paymentId,
            payment.payment_method ? payment.payment_method : null,
            payment.payment_method_title ? payment.payment_method_title : null,
            payment.transaction_id ? payment.transaction_id : null,
            payment.payment_url ? payment.payment_url : null,
            payment.needs_payment === '' ? null : payment.needs_payment ? 1 : 0, // 문자열 비교 후 불리언을 숫자로 변환
            payment.needs_processing === '' ? null : payment.needs_processing ? 1 : 0, // 동일하게 처리
            payment.date_paid ? payment.date_paid : null,
            payment.date_paid_gmt ? payment.date_paid_gmt : null,
            orderId,
          ],
        );
        return resolve(paymentId);
      } catch (error) {
        console.error('Payment Service Insert Error');
        console.error(error);
        return reject(error);
      }
    });
  }

  async update(queryRunner: QueryRunner, payment: any, orderId: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingPayment = await queryRunner.manager.query(`SELECT * FROM \`payment\` WHERE order_id=?;`, [orderId]);
        if (existingPayment.length === 0) return resolve(await this.insert(queryRunner, payment, orderId));

        await queryRunner.manager.query(
          `UPDATE \`payment\` SET 
            payment_method=?,payment_method_title=?,transaction_id=?,payment_url=?,needs_payment=?,
            needs_processing=?,date_paid=?,date_paid_gmt=?,updated_at=NOW()
          WHERE order_id=?;`,
          [
            payment.payment_method ? payment.payment_method : null,
            payment.payment_method_title ? payment.payment_method_title : null,
            payment.transaction_id ? payment.transaction_id : null,
            payment.payment_url ? payment.payment_url : null,
            payment.needs_payment === '' ? null : payment.needs_payment ? 1 : 0, // 문자열 비교 후 불리언을 숫자로 변환
            payment.needs_processing === '' ? null : payment.needs_processing ? 1 : 0, // 동일하게 처리
            payment.date_paid ? payment.date_paid : null,
            payment.date_paid_gmt ? payment.date_paid_gmt : null,
            orderId,
          ],
        );
        return resolve(true);
      } catch (error) {
        console.error('Payment Service Update Error');
        console.error(error);
        return reject(error);
      }
    });
  }
}
