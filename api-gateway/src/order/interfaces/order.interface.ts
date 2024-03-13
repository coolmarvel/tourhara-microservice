export interface IOrderService {
  createAnOrder_stag(payment: object, billing: object, shipping: object, line_items: object, shipping_lines: object): Promise<void>;

  retrieveAnOrder_stag(order_id: string): Promise<any>;

  listAllOrders_stag(page: number, size: number): Promise<any>;

  updateAnOrder_stag(order_id: string): Promise<void>;

  deleteAnOrder_stag(order_id: string): Promise<void>;

  createAnOrder_prod(payment: object, billing: object, shipping: object, line_items: object, shipping_lines: object): Promise<void>;

  retrieveAnOrder_prod(order_id: string): Promise<any>;

  listAllOrders_prod(page: number, size: number): Promise<any>;

  updateAnOrder_prod(order_id: string): Promise<void>;

  deleteAnOrder_prod(order_id: string): Promise<void>;
}
