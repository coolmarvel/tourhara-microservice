import { QueryRunner } from 'typeorm';

export interface IGuestHouseService {
  insert(queryRunner: QueryRunner, guestHouse: any, orderId: bigint): Promise<any>;

  update(queryRunner: QueryRunner, guestHouse: any, orderId: bigint): Promise<any>;
}
