import { QueryRunner } from 'typeorm';

export interface IGuestHouseService {
  insert(queryRunner: QueryRunner, guestHouse: any, orderId: string): Promise<any>;

  update(queryRunner: QueryRunner, guestHouse: any, orderId: string): Promise<any>;
}
