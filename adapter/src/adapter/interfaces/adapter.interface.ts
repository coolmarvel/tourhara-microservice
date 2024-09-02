export default interface IAdapterService {
  getOrders(product_id: string, after: string, before: string): Promise<any>;

  updateOrder();

  getActivityLogs();
}
