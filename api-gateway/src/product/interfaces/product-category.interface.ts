export interface IProductCategoryService {
  createProductCategory_stag(name: string, image: any): Promise<any>;

  retrieveProductCategory_stag(category_id: string): Promise<any>;

  listAllProductCategories_stag(page: number, size: number): Promise<any>;

  updateProductCategory_stag(category_id: string, data: any): Promise<any>;

  deleteProductCategory_stag(category_id: string): Promise<any>;

  createProductCategory_prod(name: string, image: any): Promise<any>;

  retrieveProductCategory_prod(category_id: string): Promise<any>;

  listAllProductCategories_prod(page: number, size: number): Promise<any>;

  updateProductCategory_prod(category_id: string, data: any): Promise<any>;

  deleteProductCategory_prod(category_id: string): Promise<any>;
}
