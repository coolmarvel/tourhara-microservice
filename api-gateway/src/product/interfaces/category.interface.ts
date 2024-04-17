export interface ICategoryService {
  createAProductCategory(data: any): Promise<any>;

  retrieveAProductCategory(category_id: number): Promise<any>;

  listAllProductCategories(page: number, size: number): Promise<any>;

  updateAProductCategory(category_id: number, data: any): Promise<any>;

  deleteAProductCategory(category_id: number): Promise<any>;
}
