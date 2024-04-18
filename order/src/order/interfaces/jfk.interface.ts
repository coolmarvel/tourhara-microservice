import { QueryRunner } from 'typeorm';

export interface IJfkService {
  insert(queryRunner: QueryRunner, jfkOneway: any, jfkShuttleRt: any, orderId: string): Promise<any>;

  update(queryRunner: QueryRunner, jfkOneway: any, jfkShuttleRt: any, orderId: string): Promise<any>;
}
