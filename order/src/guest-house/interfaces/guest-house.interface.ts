import { QueryRunner } from 'typeorm';

export interface IGuestHouseService {
  saveGuestHouse(queryRunner: QueryRunner, orderId: string, guestHouse: any): Promise<any>;
}
