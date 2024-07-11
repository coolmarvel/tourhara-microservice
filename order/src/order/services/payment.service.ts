import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';

import { IPaymentService } from '../interfaces';
import { logger } from '../../common';

@Injectable()
export default class PaymentService implements IPaymentService {
  async select(queryRunner: QueryRunner, orderId: bigint): Promise<any> {
    try {
      throw new Error('Method not implemented.');
    } catch (error) {
      logger.error('');
      throw error;
    }
  }

  async insert(queryRunner: QueryRunner, payment: any, orderId: bigint): Promise<any> {
    try {
      const existing = await queryRunner.manager.query(`SELECT payment_id FROM \`payment\` WHERE order_id=?;`, [orderId]);
      if (existing.length > 0) {
        await this.update(queryRunner, payment, orderId);
        logger.info(`Payment record updated for order_id=${orderId}`);
      } else {
        await queryRunner.manager.query(
          `INSERT INTO \`payment\` (
            order_id, payment_method, payment_method_title, transaction_id,
            payment_url, needs_payment, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW());`,
          [orderId, payment.paymentMethod, payment.paymentMethodTitle, payment.transactionId, payment.paymentUrl, payment.needsPayment],
        );
        logger.info(`New payment record inserted for order_id=${orderId}`);
      }
    } catch (error) {
      logger.error('Payment Service Insert Error');
      throw error;
    }
  }

  async update(queryRunner: QueryRunner, payment: any, orderId: bigint): Promise<any> {
    try {
      await queryRunner.manager.query(
        `UPDATE \`payment\` SET 
          payment_method=?, payment_method_title=?, transaction_id=?, 
          payment_url=?, needs_payment=?, updated_at=NOW() 
        WHERE order_id=?;`,
        [payment.paymentMethod, payment.paymentMethodTitle, payment.transactionId, payment.paymentUrl, payment.needsPayment, orderId],
      );
    } catch (error) {
      logger.error('Payment Service Update Error');
      throw error;
    }
  }
}
