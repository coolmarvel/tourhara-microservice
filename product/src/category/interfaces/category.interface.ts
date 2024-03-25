import { QueryRunner } from 'typeorm';

export interface ICategoryService {
  // WooCommerce Staging Product Category APIs
  createAProductCategory_stag(data: any): Promise<any>;

  retrieveAProductCategory_stag(category_id: string): Promise<any>;

  listAllProductCategories_stag(page: number, size: number): Promise<any>;

  updateAProductCategory_stag(category_id: string, data: any): Promise<any>;

  deleteAProductCategory_stag(category_id: string): Promise<any>;

  // WooCommerce Production Product Category APIs
  createAProductCategory_prod(data: any): Promise<any>;

  retrieveAProductCategory_prod(category_id: string): Promise<any>;

  listAllProductCategories_prod(page: number, size: number): Promise<any>;

  updateAProductCategory_prod(category_id: string, data: any): Promise<any>;

  deleteAProductCategory_prod(category_id: string): Promise<any>;

  // Database First Insert
  insertProductCategories_stag(): Promise<any>;

  insertProductCategories_prod(): Promise<any>;

  saveProductCategory_stag(queryRunner: QueryRunner, category: any): Promise<any>;

  saveProductCategory_prod(queryRunner: QueryRunner, category: any): Promise<any>;
}
