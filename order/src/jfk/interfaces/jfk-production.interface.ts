import { QueryRunner } from 'typeorm';

export interface IJfkProductionService {
  insert(queryRunner: QueryRunner, jfkOneway: any, jfkShuttleRt: any, orderId: string): Promise<any>;
}
