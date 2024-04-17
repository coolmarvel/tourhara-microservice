import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { IBillingService } from 'src/order/interfaces/billing.interface';
import { QueryRunner } from 'typeorm';

@Injectable()
export class BillingProductionService implements IBillingService {
  async insert(queryRunner: QueryRunner, billing: any, orderId: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingBilling = await queryRunner.manager.query(`
        SELECT order_id FROM \`billing\` WHERE order_id='${orderId}';`);
        if (existingBilling.length > 0) return resolve(true);

        const billingId = uuid();
        await queryRunner.manager.query(`
        INSERT INTO \`billing\` (
          billing_id, first_name, last_name, company, address_1, address_2,
          city, email, phone, survey, order_id, created_at, updated_at
        ) VALUES (
          '${billingId}',
          ${billing.first_name === '' ? null : `'${billing.first_name}'`},
          ${billing.last_name === '' ? null : `'${billing.last_name}'`},
          ${billing.company === '' ? null : `'${billing.company}'`},
          ${billing.address_1 === '' ? null : `'${billing.address_1}'`},
          ${billing.address_2 === '' ? null : `'${billing.address_2}'`},
          ${billing.city === '' ? null : `'${billing.city}'`},
          ${billing.email === '' ? null : `'${billing.email}'`},
          ${billing.phone === '' ? null : `'${billing.phone}'`},
          ${billing.survey === '' ? null : `'${billing.survey}'`},
          '${orderId}', NOW(), NOW()
        );`);

        return resolve(true);
      } catch (error) {
        console.error('Billing Service Insert Error');
        console.error(error);
        return reject(error);
      }
    });
  }
}
