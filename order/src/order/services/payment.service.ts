import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';

import { IPaymentService } from '../interfaces/payment.interface';
import { logger } from '../../common';

@Injectable()
export class PaymentService implements IPaymentService {
  async insert(queryRunner: QueryRunner, payment: any, orderId: bigint): Promise<any> {
    try {
      const existingPayment = await queryRunner.manager.query(`SELECT * FROM \`payment\` WHERE order_id=?;`, [orderId]);
      if (existingPayment.length > 0) return true;

      await queryRunner.manager.query(
        `INSERT INTO \`payment\` (
            payment_method,payment_method_title,transaction_id,payment_url,needs_payment,
            needs_processing,date_paid,date_paid_gmt,order_id,created_at,updated_at
          ) VALUES (?,?,?,?,?,?,?,?,?,NOW(),NOW());`,
        [
          payment.payment_method ? payment.payment_method : null,
          payment.payment_method_title ? payment.payment_method_title : null,
          payment.transaction_id ? payment.transaction_id : null,
          payment.payment_url ? payment.payment_url : null,
          payment.needs_payment === true ? 1 : 0,
          payment.needs_processing === true ? 1 : 0,
          payment.date_paid ? payment.date_paid : null,
          payment.date_paid_gmt ? payment.date_paid_gmt : null,
          orderId,
        ],
      );
      const result = await queryRunner.manager.query(`SELECT LAST_INSERT_ID() as payment_id;`);

      return BigInt(result[0].payment_id);
    } catch (error) {
      logger.error('Payment Service Insert Error');
      logger.error(error);
      throw error;
    }
  }

  async update(queryRunner: QueryRunner, payment: any, orderId: bigint): Promise<any> {
    try {
      const existingPayment = await queryRunner.manager.query(`SELECT * FROM \`payment\` WHERE order_id=?;`, [orderId]);
      if (existingPayment.length === 0) return await this.insert(queryRunner, payment, orderId);

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
          payment.needs_payment === true ? 1 : 0,
          payment.needs_processing === true ? 1 : 0,
          payment.date_paid ? payment.date_paid : null,
          payment.date_paid_gmt ? payment.date_paid_gmt : null,
          orderId,
        ],
      );

      return true;
    } catch (error) {
      logger.error('Payment Service Update Error');
      logger.error(error);
      throw error;
    }
  }
}
