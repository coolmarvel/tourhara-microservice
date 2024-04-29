import { Injectable } from '@nestjs/common';
import { IShippingService } from 'src/order/interfaces/shipping.interface';
import { QueryRunner } from 'typeorm';
import { logger } from 'src/common/logger/logger.service';

@Injectable()
export class ShippingStagingService implements IShippingService {
  async insert(queryRunner: QueryRunner, shipping: any, orderId: bigint): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingShipping = await queryRunner.manager.query(
          `SELECT * FROM \`shipping\` 
          WHERE order_id=?;`,
          [orderId],
        );
        if (existingShipping.length > 0) return resolve(true);

        await queryRunner.manager.query(
          `INSERT INTO \`shipping\` (
            first_name,last_name,company,address_1,address_2,city,state,
            postcode,country,phone,shipping_mobile,order_id,created_at,updated_at
          ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,NOW(),NOW());`,
          [
            shipping.first_name === '' ? null : shipping.first_name,
            shipping.last_name === '' ? null : shipping.last_name,
            shipping.company === '' ? null : shipping.company,
            shipping.address_1 === '' ? null : shipping.address_1,
            shipping.address_2 === '' ? null : shipping.address_2,
            shipping.city === '' ? null : shipping.city,
            shipping.state === '' ? null : shipping.state,
            shipping.postcode === '' ? null : shipping.postcode,
            shipping.country === '' ? null : shipping.country,
            shipping.phone === '' ? null : shipping.phone,
            shipping.shipping_mobile === '' ? null : shipping.shipping_mobile,
            orderId,
          ],
        );

        return resolve(true);
      } catch (error) {
        logger.error('Shipping Service Insert Error');
        logger.error(error);
        return reject(error);
      }
    });
  }

  async update(queryRunner: QueryRunner, shipping: any, orderId: bigint): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingShipping = await queryRunner.manager.query(
          `SELECT * FROM \`shipping\` 
          WHERE order_id=?;`,
          [orderId],
        );
        if (existingShipping.length === 0) return resolve(await this.insert(queryRunner, shipping, orderId));

        await queryRunner.manager.query(
          `UPDATE \`shipping\` SET 
            first_name=?,last_name=?,company=?,address_1=?,address_2=?,city=?,
            state=?,postcode=?,country=?,phone=?,shipping_mobile=?,updated_at=NOW()
          WHERE order_id=?;`,
          [
            shipping.first_name === '' ? null : shipping.first_name,
            shipping.last_name === '' ? null : shipping.last_name,
            shipping.company === '' ? null : shipping.company,
            shipping.address_1 === '' ? null : shipping.address_1,
            shipping.address_2 === '' ? null : shipping.address_2,
            shipping.city === '' ? null : shipping.city,
            shipping.state === '' ? null : shipping.state,
            shipping.postcode === '' ? null : shipping.postcode,
            shipping.country === '' ? null : shipping.country,
            shipping.phone === '' ? null : shipping.phone,
            shipping.shipping_mobile === '' ? null : shipping.shipping_mobile,
            orderId,
          ],
        );

        return resolve(true);
      } catch (error) {
        logger.error('Shipping Service Update Error');
        logger.error(error);
        return reject(error);
      }
    });
  }
}
