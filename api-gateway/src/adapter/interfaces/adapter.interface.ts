export interface IAdapterService {
  getAllProductTypes(): Promise<any>;

  getAllNotSpecifiedProductCategories(): Promise<any>;

  getSpecifiedProductCategoryByType(type_id: number): Promise<any>;

  updateProductCategory(category_id: number, type_id: number): Promise<any>;

  getAllProducts(type_id: number): Promise<any>;
}
