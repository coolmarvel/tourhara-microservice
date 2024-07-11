import { QueryRunner } from 'typeorm';

export default interface ITourInfoService {
  select(queryRunner: QueryRunner, orderId: bigint): Promise<any>;

  insert(queryRunner: QueryRunner, tourInfo: any, orderId: bigint): Promise<any>;

  update(queryRunner: QueryRunner, tourInfo: any, orderId: bigint): Promise<any>;
}
