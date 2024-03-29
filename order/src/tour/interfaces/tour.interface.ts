import { QueryRunner } from 'typeorm';

export interface ITourService {
  insert(queryRunner: QueryRunner, tour: any, tourInfo: any, orderId: string): Promise<any>;
}
