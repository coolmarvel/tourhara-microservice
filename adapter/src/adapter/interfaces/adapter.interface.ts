export interface IAdapterService {
  // Categories & Types
  getAllProductTypes(): Promise<any>;

  getAllNotSpecifiedProductCategories(): Promise<any>;

  getSpecifiedProductCategoryByType(type_id: number): Promise<any>;

  updateProductCategory(category_id: number, type_id: number): Promise<any>;

  // Products
  getAllProducts(type_id: number): Promise<any>;

  // Orders
  getOrdersByTypeId(type_id: number, page: number, size: number): Promise<any>;
}
