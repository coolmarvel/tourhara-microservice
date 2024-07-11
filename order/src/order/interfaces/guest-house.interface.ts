import { QueryRunner } from 'typeorm';

export default interface IGuestHouseService {
  select(queryRunner: QueryRunner, orderId: bigint): Promise<any>;

  insert(queryRunner: QueryRunner, guestHouse: any, orderId: bigint): Promise<any>;

  update(queryRunner: QueryRunner, guestHouse: any, orderId: bigint): Promise<any>;
}
