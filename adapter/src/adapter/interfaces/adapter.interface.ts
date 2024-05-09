export interface IAdapterService {
  // Categories & Types
  getAllTypes(): Promise<any>;

  getAllNotDeclaredCategories(): Promise<any>;

  getAllDeclaredCategories(type_id: number): Promise<any>;

  updateCategoryByType(type_id: number, category_id: number): Promise<any>;

  // Orders
  getAdaptedOrders(type_id: number, category_id: number, page: number, size: number): Promise<any>;

  // Products
  getAllProducts(type_id: number): Promise<any>;
}
