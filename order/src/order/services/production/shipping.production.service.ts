import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { IShippingService } from 'src/order/interfaces/shipping.interface';
import { QueryRunner } from 'typeorm';

@Injectable()
export class ShippingProductionService implements IShippingService {
  async insert(queryRunner: QueryRunner, shipping: any, orderId: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingShipping = await queryRunner.manager.query(`
        SELECT order_id FROM \`shipping\` WHERE order_id='${orderId}';`);
        if (existingShipping.length > 0) return resolve(true);

        const shippingId = uuid();
        await queryRunner.manager.query(`
        INSERT INTO \`shipping\` (
          shipping_id, first_name, last_name, company, address_1, address_2, city, state,
          postcode, country, phone, shipping_mobile, order_id, created_at, updated_at
        ) VALUES (
          '${shippingId}',
          ${shipping.first_name === '' ? null : `'${shipping.first_name}'`},
          ${shipping.last_name === '' ? null : `'${shipping.last_name}'`},
          ${shipping.company === '' ? null : `'${shipping.company}'`},
          ${shipping.address_1 === '' ? null : `'${shipping.address_1}'`},
          ${shipping.address_2 === '' ? null : `'${shipping.address_2}'`},
          ${shipping.city === '' ? null : `'${shipping.city}'`},
          ${shipping.state === '' ? null : `'${shipping.state}'`},
          ${shipping.postcode === '' ? null : `'${shipping.postcode}'`},
          ${shipping.country === '' ? null : `'${shipping.country}'`},
          ${shipping.phone === '' ? null : `'${shipping.phone}'`},
          ${shipping.shipping_mobile === '' ? null : `'${shipping.shipping_mobile}'`},
          '${orderId}', NOW(), NOW()
        );`);

        return resolve(true);
      } catch (error) {
        console.error('Shipping Service Insert Error');
        console.error(error);
        return reject(error);
      }
    });
  }
}
