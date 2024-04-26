import { QueryRunner } from 'typeorm';

export interface ITourService {
  insert(queryRunner: QueryRunner, tour: any, tourInfo: any, orderId: bigint): Promise<any>;

  update(queryRunner: QueryRunner, tour: any, tourInfo: any, orderId: bigint): Promise<any>;
}
