import { QueryRunner } from 'typeorm';

export interface IBillingStagingService {
  insert(queryRunner: QueryRunner, billing: any, orderId: string): Promise<any>;
}
