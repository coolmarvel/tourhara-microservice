import { Injectable } from '@nestjs/common';
import { IBillingService } from 'src/order/interfaces/billing.interface';
import { QueryRunner } from 'typeorm';
import { logger } from 'src/common/logger/logger.service';

@Injectable()
export class BillingStagingService implements IBillingService {
  insert(queryRunner: QueryRunner, billing: any, orderId: bigint): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingBilling = await queryRunner.manager.query(`SELECT * FROM \`billing\` WHERE order_id=?;`, [orderId]);
        if (existingBilling.length > 0) return resolve(true);

        await queryRunner.manager.query(
          `INSERT INTO \`billing\` (
            first_name,last_name,company,address_1,address_2,
            city,email,phone,survey,order_id,created_at,updated_at
          ) VALUES (?,?,?,?,?,?,?,?,?,?,NOW(),NOW());`,
          [
            billing.first_name === '' ? null : billing.first_name,
            billing.last_name === '' ? null : billing.last_name,
            billing.company === '' ? null : billing.company,
            billing.address_1 === '' ? null : billing.address_1,
            billing.address_2 === '' ? null : billing.address_2,
            billing.city === '' ? null : billing.city,
            billing.email === '' ? null : billing.email,
            billing.phone === '' ? null : billing.phone,
            billing.survey === '' ? null : billing.survey,
            orderId,
          ],
        );

        return resolve(true);
      } catch (error) {
        logger.error('Billing Service Insert Error');
        logger.error(error);
        return reject(error);
      }
    });
  }

  update(queryRunner: QueryRunner, billing: any, orderId: bigint): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingBilling = await queryRunner.manager.query(`SELECT * FROM \`billing\` WHERE order_id=?;`, [orderId]);
        if (existingBilling.length === 0) return resolve(await await this.insert(queryRunner, billing, orderId));

        await queryRunner.manager.query(
          `UPDATE \`billing\` SET
            first_name=?,last_name=?,company=?,address_1=?,address_2=?,
            city=?,email=?,phone=?,survey=?,updated_at=NOW()
          WHERE order_id=?;`,
          [
            billing.first_name === '' ? null : billing.first_name,
            billing.last_name === '' ? null : billing.last_name,
            billing.company === '' ? null : billing.company,
            billing.address_1 === '' ? null : billing.address_1,
            billing.address_2 === '' ? null : billing.address_2,
            billing.city === '' ? null : billing.city,
            billing.email === '' ? null : billing.email,
            billing.phone === '' ? null : billing.phone,
            billing.survey === '' ? null : billing.survey,
            orderId,
          ],
        );

        return resolve(true);
      } catch (error) {
        logger.error('Billing Service Update Error');
        logger.error(error);
        return reject(error);
      }
    });
  }
}
