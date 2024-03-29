import { QueryRunner } from 'typeorm';

export interface IGuestHouseProductionService {
  insert(queryRunner: QueryRunner, guestHouse: any, orderId: string): Promise<any>;
}
