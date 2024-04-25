export interface IAdapterService {
  // Categories & Types
  getAllProductTypes(): Promise<any>;

  getAllNotSpecifiedProductCategories(): Promise<any>;

  getSpecifiedProductCategoryByType(product_type_id: string): Promise<any>;

  updateProductCategory(product_category_id: string, product_type_id: string): Promise<any>;

  // Products
  getAllProducts(product_type_id: string): Promise<any>;

  // Orders
  getOrdersByTypeId(product_type_id: string): Promise<any>;
}
