import { QueryRunner } from 'typeorm';

export interface ITagService {
  /**
   * Webhook
   */
  createAProductTag(data: any): Promise<any>;

  retrieveAProductTag(tag_id: number): Promise<any>;

  listAllProductTags(page: number, size: number): Promise<any>;

  updateAProductTag(tag_id: number, data: any): Promise<any>;

  deleteAProductTag(tag_id: number): Promise<any>;

  /**
   * Webhook
   */
  insert(queryRunner: QueryRunner, tag: any): Promise<any>;

  update(queryRunner: QueryRunner, tag: any): Promise<any>;

  selectAll(queryRunner: QueryRunner, tag: any): Promise<any>;

  select(queryRunner: QueryRunner, tag: any): Promise<any>;

  delete(queryRunner: QueryRunner, tag: any): Promise<any>;
}
