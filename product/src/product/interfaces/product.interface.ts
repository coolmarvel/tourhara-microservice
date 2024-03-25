import { QueryRunner } from 'typeorm';

export interface IProductService {
  createAProduct_stag(data: any): Promise<any>;

  retrieveAProduct_stag(product_id: string): Promise<any>;

  listAllProducts_stag(page: number, size: number): Promise<any>;

  updateAProduct_stag(product_id: string, data: any): Promise<any>;

  deleteAProduct_stag(product_id: string): Promise<any>;

  createAProduct_prod(data: any): Promise<any>;

  retrieveAProduct_prod(product_id: string): Promise<any>;

  listAllProducts_prod(page: number, size: number): Promise<any>;

  updateAProduct_prod(product_id: string, data: any): Promise<any>;

  deleteAProduct_prod(product_id: string): Promise<any>;

  saveProduct_stag(queryRunner: QueryRunner, product: any): Promise<any>;

  saveProduct_prod(queryRunner: QueryRunner, product: any): Promise<any>;

  saveProductImage_stag(queryRunner: QueryRunner, image: any): Promise<any>;

  saveProductImage_prod(queryRunner: QueryRunner, image: any): Promise<any>;

  synchronizeProduct_stag(): Promise<any>;

  synchronizeProduct_prod(): Promise<any>;
}
