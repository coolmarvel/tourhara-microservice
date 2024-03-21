import { QueryRunner } from 'typeorm';

export interface IJfkService {
  saveJfkOneway_prod(queryRunner: QueryRunner, orderId: string, jfkOneway: any): Promise<any>;

  saveJfkShuttleRt_prod(queryRunner: QueryRunner, orderId: string, jfkShuttleRt: any): Promise<any>;
}
