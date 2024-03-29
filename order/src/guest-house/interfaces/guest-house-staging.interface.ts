import { QueryRunner } from 'typeorm';

export interface IGuestHouseStagingService {
  insert(queryRunner: QueryRunner, guestHouse: any, orderId: string): Promise<any>;
}
