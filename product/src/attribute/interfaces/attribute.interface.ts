import { QueryRunner } from 'typeorm';

export interface IAttributeService {
  // WooCommerce Staging Product Attribute APIs
  createAProductAttribute_stag(data: any): Promise<any>;

  retrieveAProductAttribute_stag(attribute_id: string): Promise<any>;

  listAllProductAttributes_stag(page: number, size: number): Promise<any>;

  updateAProductAttribute_stag(attribute_id: string, data: any): Promise<any>;

  deleteAProductAttribute_stag(attribute_id: string): Promise<any>;

  // WooCommerce Production Product Attribute APIs
  createAProductAttribute_prod(data: any): Promise<any>;

  retrieveAProductAttribute_prod(attribute_id: string): Promise<any>;

  listAllProductAttributes_prod(page: number, size: number): Promise<any>;

  updateAProductAttribute_prod(attribute_id: string, data: any): Promise<any>;

  deleteAProductAttribute_prod(attribute_id: string): Promise<any>;

  // --
  insertProductAttribute_stag(): Promise<any>;

  insertProductAttribute_prod(): Promise<any>;

  saveProductAttribute_stag(queryRunner: QueryRunner, attribute_id: number, attribute: any): Promise<any>;

  saveProductAttribute_prod(queryRunner: QueryRunner, attribute_id: number, attribute: any): Promise<any>;
}
