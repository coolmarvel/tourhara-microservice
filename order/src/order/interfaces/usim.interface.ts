import { QueryRunner } from 'typeorm';

export interface IUsimService {
  insert(queryRunner: QueryRunner, snapInfo: any, usimInfo: any, h2ousim: any, orderId: bigint): Promise<any>;

  update(queryRunner: QueryRunner, snapInfo: any, usimInfo: any, h2ousim: any, orderId: bigint): Promise<any>;
}
