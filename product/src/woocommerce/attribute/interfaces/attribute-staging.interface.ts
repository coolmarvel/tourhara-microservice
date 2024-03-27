import { QueryRunner } from 'typeorm';

export interface IAttributeStagingService {
  createAProductAttribute(data: any): Promise<any>;

  retrieveAProductAttribute(attribute_id: number): Promise<any>;

  listAllProductAttributes(page: number, size: number): Promise<any>;

  updateAProductAttribute(attribute_id: number, data: any): Promise<any>;

  deleteAProductAttribute(attribute_id: number): Promise<any>;

  insertAttribute(queryRunner: QueryRunner, attribute: any): Promise<any>;

  updateAttribute(queryRunner: QueryRunner, attribute: any): Promise<any>;

  selectAttribute(queryRunner: QueryRunner, page: number, size: number): Promise<any>;

  selectAttributeById(queryRunner: QueryRunner, attribute_id: number): Promise<any>;

  deleteAttribute(queryRunner: QueryRunner, attribute_id: number): Promise<any>;
}
