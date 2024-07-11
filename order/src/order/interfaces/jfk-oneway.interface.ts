import { QueryRunner } from 'typeorm';

export default interface IJfkOnewayService {
  select(queryRunner: QueryRunner, orderId: bigint): Promise<any>;

  insert(queryRunner: QueryRunner, jfkOneway: any, orderId: bigint): Promise<any>;

  update(queryRunner: QueryRunner, jfkOneway: any, orderId: bigint): Promise<any>;
}
