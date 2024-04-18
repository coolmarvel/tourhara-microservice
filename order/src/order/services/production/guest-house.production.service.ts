import { v4 as uuid } from 'uuid';

import { Injectable } from '@nestjs/common';
import { IGuestHouseService } from 'src/order/interfaces/guest-house.interface';
import { QueryRunner } from 'typeorm';

@Injectable()
export class GuestHouseProductionService implements IGuestHouseService {
  async insert(queryRunner: QueryRunner, guestHouse: any, orderId: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingGuestHouse = await queryRunner.manager.query(`
        SELECT order_id FROM \`guest_house\` WHERE order_id='${orderId}';`);
        if (existingGuestHouse.length > 0) return resolve(true);

        const guestHouseId = uuid();
        await queryRunner.manager.query(`
        INSERT INTO \`guest_house\` (
          guest_house_id, reserved_name, sex_age, mobile_guest, departure,
          arrival_time, security_deposit, order_id, created_at, updated_at
        ) VALUES (
          '${guestHouseId}',
          ${guestHouse.reserved_name === '' ? null : `'${guestHouse.reserved_name}'`},
          ${guestHouse.sex_age === '' ? null : `'${guestHouse.sex_age}'`},
          ${guestHouse.mobile_guest === '' ? null : `'${guestHouse.mobile_guest}'`},
          ${guestHouse.departure === '' ? null : `'${guestHouse.departure}'`},
          ${guestHouse.arrival_time === '' ? null : `'${guestHouse.arrival_time}'`},
          ${guestHouse.security_deposit === '' ? null : `'${guestHouse.security_deposit}'`},
          '${orderId}', NOW(), NOW()
        );`);

        return resolve(true);
      } catch (error) {
        console.error('GuestHouse Service Insert Error');
        console.error(error);
        return reject(error);
      }
    });
  }

  async update(queryRunner: QueryRunner, guestHouse: any, orderId: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingGuestHouse = await queryRunner.manager.query(`
        SELECT order_id FROM \`guest_house\` WHERE order_id='${orderId}';`);
        if (existingGuestHouse.length === 0) return resolve(await this.insert(queryRunner, guestHouse, orderId));

        await queryRunner.manager.query(`
        UPDATE \`guest_house\` SET
        reserved_name=${guestHouse.reserved_name === '' ? null : `'${guestHouse.reserved_name}'`},
        sex_age=${guestHouse.sex_age === '' ? null : `'${guestHouse.sex_age}'`},
        mobile_guest=${guestHouse.mobile_guest === '' ? null : `'${guestHouse.mobile_guest}'`},
        departure=${guestHouse.departure === '' ? null : `'${guestHouse.departure}'`},
        arrival_time=${guestHouse.arrival_time === '' ? null : `'${guestHouse.arrival_time}'`},
        security_deposit=${guestHouse.security_deposit === '' ? null : `'${guestHouse.security_deposit}'`},
        updated_at=NOW() WHERE order_id='${orderId}';`);

        return resolve(true);
      } catch (error) {
        return reject(error);
      }
    });
  }
}
