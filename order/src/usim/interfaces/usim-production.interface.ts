import { QueryRunner } from 'typeorm';

export interface IUsimProductionService {
  insert(queryRunner: QueryRunner, snapInfo: any, usimInfo: any, h2ousim: any, orderId: string): Promise<any>;
}
