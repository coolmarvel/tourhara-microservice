export default interface IOrderService {
  getOrders(product_id: string, after: string, before: string): Promise<any>;
}
