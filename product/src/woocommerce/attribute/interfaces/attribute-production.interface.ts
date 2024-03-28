import { QueryRunner } from 'typeorm';

export interface IAttributeProductionService {
  /**
   * WooCommerce
   */
  createAProductAttribute(data: any): Promise<any>;

  retrieveAProductAttribute(attribute_id: number): Promise<any>;

  listAllProductAttributes(page: number, size: number): Promise<any>;

  updateAProductAttribute(attribute_id: number, data: any): Promise<any>;

  deleteAProductAttribute(attribute_id: number): Promise<any>;

  /**
   * Synchronize
   */
  insert(queryRunner: QueryRunner, attribute: any): Promise<any>;

  update(queryRunner: QueryRunner, attribute: any): Promise<any>;

  selectAll(queryRunner: QueryRunner, attribute: any): Promise<any>;

  select(queryRunner: QueryRunner, attribute: any): Promise<any>;

  delete(queryRunner: QueryRunner, attribute: any): Promise<any>;
}
