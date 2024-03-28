import { QueryRunner } from 'typeorm';

export interface ITagProductionService {
  createAProductTag(data: any): Promise<any>;

  retrieveAProductTag(tag_id: number): Promise<any>;

  listAllProductTags(page: number, size: number): Promise<any>;

  updateAProductTag(tag_id: number, data: any): Promise<any>;

  deleteAProductTag(tag_id: number): Promise<any>;

  insert(queryRunner: QueryRunner, tag: any): Promise<any>;

  update(queryRunner: QueryRunner, tag: any): Promise<any>;

  selectAll(queryRunner: QueryRunner, tag: any): Promise<any>;

  select(queryRunner: QueryRunner, tag: any): Promise<any>;

  delete(queryRunner: QueryRunner, category: any): Promise<any>;
}
