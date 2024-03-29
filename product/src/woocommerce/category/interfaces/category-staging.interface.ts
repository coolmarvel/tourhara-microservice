import { QueryRunner } from 'typeorm';

export interface ICategoryStagingService {
  /**
   * WooCommerce
   */
  createAProductCategory(data: any): Promise<any>;

  retrieveAProductCategory(category_id: number): Promise<any>;

  listAllProductCategories(page: number, size: number): Promise<any>;

  updateAProductCategory(category_id: number, data: any): Promise<any>;

  deleteAProductCategory(category_id: number): Promise<any>;

  /**
   * Synchronize
   */
  insert(queryRunner: QueryRunner, category: any): Promise<any>;

  update(queryRunner: QueryRunner, category: any): Promise<any>;

  selectAll(queryRunner: QueryRunner, category: any): Promise<any>;

  select(queryRunner: QueryRunner, category: any): Promise<any>;

  delete(queryRunner: QueryRunner, category: any): Promise<any>;
}
