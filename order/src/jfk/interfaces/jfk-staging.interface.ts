import { QueryRunner } from 'typeorm';

export interface IJfkStagingService {
  insert(queryRunner: QueryRunner, jfkOneway: any, jfkShuttleRt: any, orderId: string): Promise<any>;
}
