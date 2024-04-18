import { QueryRunner } from 'typeorm';

export interface ITourService {
  insert(queryRunner: QueryRunner, tour: any, tourInfo: any, orderId: string): Promise<any>;

  update(queryRunner: QueryRunner, tour: any, tourInfo: any, orderId: string): Promise<any>;
}
