export interface IAdapterService {
  getOrders(product_id: string, after: string, before: string): Promise<any>;

  updateOrder(order_id: string, double_check?: boolean, memo?: string): Promise<any>;
}
