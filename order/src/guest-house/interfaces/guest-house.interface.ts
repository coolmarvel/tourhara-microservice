import { QueryRunner } from 'typeorm';

export interface IGuestHouseService {
  saveGuestHouse_prod(queryRunner: QueryRunner, orderId: string, guestHouse: any): Promise<any>;
}
