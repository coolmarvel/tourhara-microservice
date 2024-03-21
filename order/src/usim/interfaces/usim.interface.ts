import { QueryRunner } from 'typeorm';

export interface IUsimService {
  saveSnapInfo_prod(queryRunner: QueryRunner, orderId: string, snapInfo: any): Promise<any>;

  saveUsimInfo_prod(queryRunner: QueryRunner, orderId: string, usimInfo: any): Promise<any>;

  saveH2ousim_prod(queryRunner: QueryRunner, orderId: string, h2ousim: any): Promise<any>;
}
