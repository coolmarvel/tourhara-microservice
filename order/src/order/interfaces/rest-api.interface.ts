export default interface IRestApiService {
  createAnOrder(payload: any): Promise<any>;

  retrieveAnOrder(order_id: number): Promise<any>;

  listAllOrders(page: number, size: number, date: string): Promise<any>;

  updateAnOrder(order_id: number, data: any): Promise<any>;

  deleteAnOrder(order_id: number): Promise<any>;
}
