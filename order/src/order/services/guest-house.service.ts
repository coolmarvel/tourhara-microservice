import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';

import { IGuestHouseService } from '../interfaces/guest-house.interface';
import { logger } from '../../common';

@Injectable()
export class GuestHouseService implements IGuestHouseService {
  async insert(queryRunner: QueryRunner, guestHouse: any, orderId: bigint): Promise<any> {
    try {
      const existingGuestHouse = await queryRunner.manager.query(`SELECT * FROM \`guest_house\` WHERE order_id=?;`, [orderId]);
      if (existingGuestHouse.length > 0) return true;

      await queryRunner.manager.query(
        `INSERT INTO \`guest_house\` (
            reserved_name,sex_age,mobile_guest,departure,
            arrival_time,security_deposit,order_id,created_at,updated_at
          ) VALUES (?,?,?,?,?,?,?,NOW(),NOW());`,
        [
          guestHouse.reserved_name === '' ? null : guestHouse.reserved_name,
          guestHouse.sex_age === '' ? null : guestHouse.sex_age,
          guestHouse.mobile_guest === '' ? null : guestHouse.mobile_guest,
          guestHouse.departure === '' ? null : guestHouse.departure,
          guestHouse.arrival_time === '' ? null : guestHouse.arrival_time,
          guestHouse.security_deposit === '' ? null : guestHouse.security_deposit,
          orderId,
        ],
      );

      return true;
    } catch (error) {
      logger.error('GuestHouse Service Insert Error');
      logger.error(error);
      throw error;
    }
  }

  async update(queryRunner: QueryRunner, guestHouse: any, orderId: bigint): Promise<any> {
    try {
      const existingGuestHouse = await queryRunner.manager.query(`SELECT * FROM \`guest_house\`  WHERE order_id=?;`, [orderId]);
      if (existingGuestHouse.length === 0) return await this.insert(queryRunner, guestHouse, orderId);

      await queryRunner.manager.query(
        `UPDATE \`guest_house\` SET 
            reserved_name=?,sex_age=?,mobile_guest=?,departure=?,
            arrival_time=?,security_deposit=?,updated_at=NOW()
          WHERE order_id=?`,
        [
          guestHouse.reserved_name === '' ? null : guestHouse.reserved_name,
          guestHouse.sex_age === '' ? null : guestHouse.sex_age,
          guestHouse.mobile_guest === '' ? null : guestHouse.mobile_guest,
          guestHouse.departure === '' ? null : guestHouse.departure,
          guestHouse.arrival_time === '' ? null : guestHouse.arrival_time,
          guestHouse.security_deposit === '' ? null : guestHouse.security_deposit,
          orderId,
        ],
      );

      return true;
    } catch (error) {
      logger.error('GuestHouse Service Update Error');
      logger.error(error);
      throw error;
    }
  }
}
