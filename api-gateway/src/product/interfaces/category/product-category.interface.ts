export interface IProductCategoryService {
  createAProductCategory_stag(name: string, image: any): Promise<any>;

  retrieveAProductCategory_stag(category_id: string): Promise<any>;

  listAllProductCategories_stag(page: number, size: number): Promise<any>;

  updateAProductCategory_stag(category_id: string, data: any): Promise<any>;

  deleteAProductCategory_stag(category_id: string): Promise<any>;

  createAProductCategory_prod(name: string, image: any): Promise<any>;

  retrieveAProductCategory_prod(category_id: string): Promise<any>;

  listAllProductCategories_prod(page: number, size: number): Promise<any>;

  updateAProductCategory_prod(category_id: string, data: any): Promise<any>;

  deleteAProductCategory_prod(category_id: string): Promise<any>;
}
