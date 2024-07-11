export default interface IAdapterService {
  // Categories & Types
  getAllTypes(): Promise<any>;

  getAllNotDeclaredCategories(): Promise<any>;

  getAllDeclaredCategories(type_id: number): Promise<any>;

  updateCategoryByType(type_id: number, category_id: number): Promise<any>;

  // Orders
  getOrdersByProductId(product_id: string, after: string, before: string): Promise<any>;

  getOrderByProductIdAndOrderId(product_id: string, order_id: string): Promise<any>;
}
