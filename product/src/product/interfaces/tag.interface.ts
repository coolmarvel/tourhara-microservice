import { QueryRunner } from 'typeorm';

export interface ITagService {
  createAProductTag(data: any): Promise<any>;

  retrieveAProductTag(tag_id: number): Promise<any>;

  listAllProductTags(page: number, size: number): Promise<any>;

  updateAProductTag(tag_id: number, data: any): Promise<any>;

  deleteAProductTag(tag_id: number): Promise<any>;

  insert(queryRunner: QueryRunner, tag: any): Promise<any>;

  select(queryRunner: QueryRunner, id: number): Promise<any>;
}
