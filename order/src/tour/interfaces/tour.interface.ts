import { QueryRunner } from 'typeorm';

export interface ITourService {
  saveTour_prod(queryRunner: QueryRunner, orderId: string, tour: any): Promise<any>;

  saveTourInfo_prod(queryRunner: QueryRunner, orderId: string, tourInfo: any): Promise<any>;
}
