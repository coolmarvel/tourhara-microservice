import { QueryRunner } from 'typeorm';

export interface ITagService {
  // WooCommerce Staging Product Tags APIs
  createAProductTag_stag(data: any): Promise<any>;

  retrieveAProductTag_stag(tag_id: string): Promise<any>;

  listAllProductTags_stag(page: number, size: number): Promise<any>;

  updateAProductTag_stag(tag_id: string, data: any): Promise<any>;

  deleteAProductTag_stag(tag_id: string): Promise<any>;

  // WooCommerce Production Product Tags APIs
  createAProductTag_prod(data: any): Promise<any>;

  retrieveAProductTag_prod(tag_id: string): Promise<any>;

  listAllProductTags_prod(page: number, size: number): Promise<any>;

  updateAProductTag_prod(tag_id: string, data: any): Promise<any>;

  deleteAProductTag_prod(tag_id: string): Promise<any>;

  insertProductTag_stag(): Promise<any>;

  insertProductTag_prod(): Promise<any>;

  // --
  saveProductTag_stag(queryRunner: QueryRunner, tag_id: number, tag: any): Promise<any>;

  saveProductTag_prod(queryRunner: QueryRunner, tag_id: number, tag: any): Promise<any>;
}
