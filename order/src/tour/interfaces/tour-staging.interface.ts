import { QueryRunner } from 'typeorm';

export interface ITourStagingService {
  insert(queryRunner: QueryRunner, tour: any, tourInfo: any, orderId: string): Promise<any>;
}
