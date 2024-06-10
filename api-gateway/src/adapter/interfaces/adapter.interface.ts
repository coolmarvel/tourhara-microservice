export interface IAdapterService {
  // Categories & Types
  getAllTypes(): Promise<any>;

  getAllNotDeclaredCategories(): Promise<any>;

  getAllDeclaredCategories(type_id: number): Promise<any>;

  updateCategoryByType(type_id: number, category_id: number): Promise<any>;

  // Orders
  getAdaptedOrders(type_id: number, category_id: number, start_date: string, end_date: string): Promise<any>;

  // Products
  getAllProducts(type_id: number): Promise<any>;

  getOrdersByProductName(product_name: string, start_date: string, end_date: string): Promise<any>;

  getOrdersByProductId(product_id: string, after: string, before: string): Promise<any>;
}
