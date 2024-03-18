export interface ITagService {
  // WooCommerce Staging Product Tags APIs
  createAProductTag_stag(data: any): Promise<any>;

  retrieveAProductTag_stag(tags_id: string): Promise<any>;

  listAllProductTags_stag(page: number, size: number): Promise<any>;

  updateAProductTag_stag(tags_id: string, data: any): Promise<any>;

  deleteAProductTag_stag(tags_id: string): Promise<any>;

  // WooCommerce Production Product Tags APIs
  createAProductTag_prod(data: any): Promise<any>;

  retrieveAProductTag_prod(tags_id: string): Promise<any>;

  listAllProductTags_prod(page: number, size: number): Promise<any>;

  updateAProductTag_prod(tags_id: string, data: any): Promise<any>;

  deleteAProductTag_prod(tags_id: string): Promise<any>;
}
