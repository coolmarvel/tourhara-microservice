export interface IAdapterService {
  getAllProductTypes(): Promise<any>;

  getAllNotSpecifiedProductCategories(): Promise<any>;

  getSpecifiedProductCategoryByType(product_type_id: string): Promise<any>;

  updateProductCategory(product_category_id: string, product_type_id: string): Promise<any>;
}
