import { QueryRunner } from 'typeorm';

export interface IUsimStagingService {
  insert(queryRunner: QueryRunner, snapInfo: any, usimInfo: any, h2ousim: any, orderId: string): Promise<any>;
}
