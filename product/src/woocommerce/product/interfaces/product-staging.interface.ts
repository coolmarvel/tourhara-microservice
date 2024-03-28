import { QueryRunner } from 'typeorm';

export interface IProductStagingService {
  createAProduct(data: any): Promise<any>;

  retrieveAProduct(product_id: number): Promise<any>;

  listAllProducts(page: number, size: number): Promise<any>;

  updateAProduct(product_id: number, data: any): Promise<any>;

  deleteAProduct(product_id: number): Promise<any>;

  synchronizeProductByWooCommerce(): Promise<any>;

  insert(queryRunner: QueryRunner, image: any, product: any): Promise<any>;

  update(queryRunner: QueryRunner, image: any, product: any): Promise<any>;

  selectAll(queryRunner: QueryRunner, image: any, product: any): Promise<any>;

  select(queryRunner: QueryRunner, image: any, product: any): Promise<any>;

  delete(queryRunner: QueryRunner, image: any, product: any): Promise<any>;
}
