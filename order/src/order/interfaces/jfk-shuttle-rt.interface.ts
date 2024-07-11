import { QueryRunner } from 'typeorm';

export default interface IJfkShuttleRtService {
  select(queryRunner: QueryRunner, orderId: bigint): Promise<any>;

  insert(queryRunner: QueryRunner, jfkShuttleRt: any, orderId: bigint): Promise<any>;

  update(queryRunner: QueryRunner, jfkShuttleRt: any, orderId: bigint): Promise<any>;
}
