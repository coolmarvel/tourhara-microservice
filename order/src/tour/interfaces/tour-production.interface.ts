import { QueryRunner } from 'typeorm';

export interface ITourProductionService {
  insert(queryRunner: QueryRunner, tour: any, tourInfo: any, orderId: string): Promise<any>;
}
