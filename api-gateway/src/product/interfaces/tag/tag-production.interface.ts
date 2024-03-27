export interface ITagProductionService {
  createAProductTag(data: any): Promise<any>;

  retrieveAProductTag(tag_id: number): Promise<any>;

  listAllProductTags(page: number, size: number): Promise<any>;

  updateAProductTag(tag_id: number, data: any): Promise<any>;

  deleteAProductTag(tag_id: number): Promise<any>;
}
