import { Injectable } from '@nestjs/common';
import { IGuestHouseService } from '../interfaces/guest-house.interface';
import { QueryRunner } from 'typeorm';
import { GuestHouse } from '../entities/guest-house.entity';

@Injectable()
export class GuestHouseService implements IGuestHouseService {
  async saveGuestHouse_prod(queryRunner: QueryRunner, orderId: string, guestHouse: any): Promise<any> {
    try {
      await queryRunner.startTransaction();

      const existingOrderGuestHouse = await queryRunner.manager.findOne(GuestHouse, { where: { orderId: orderId } });
      if (existingOrderGuestHouse) return true;

      const newOrderGuestHouse = {
        reservedName: guestHouse.reserved_name == '' ? null : guestHouse.reserved_name,
        sexAge: guestHouse.sex_age == '' ? null : guestHouse.sex_age,
        mobileGuest: guestHouse.mobile_guest == '' ? null : guestHouse.mobile_guest,
        departure: guestHouse.departure == '' ? null : guestHouse.departure,
        arrivalTime: guestHouse.arrivalTime == '' ? null : guestHouse.arrivalTime,
        securityDeposit: guestHouse.security_deposit == '' ? null : guestHouse.security_deposit,
        orderId: orderId,
      };
      const orderGuestHouse = queryRunner.manager.create(GuestHouse, newOrderGuestHouse);
      await queryRunner.manager.save(orderGuestHouse);

      await queryRunner.commitTransaction();

      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }
}
