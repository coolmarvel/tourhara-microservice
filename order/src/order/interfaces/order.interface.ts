import { QueryRunner } from 'typeorm';

export interface IOrderService {
  createAnOrder_stag(payment: object, billing: object, shipping: object, line_items: object, shipping_lines: object): Promise<any>;

  retrieveAnOrder_stag(order_id: string): Promise<any>;

  listAllOrders_stag(page: number, size: number): Promise<any>;

  updateAnOrder_stag(order_id: string, data: any): Promise<any>;

  deleteAnOrder_stag(order_id: string): Promise<any>;

  createAnOrder_prod(payment: object, billing: object, shipping: object, line_items: object, shipping_lines: object): Promise<any>;

  retrieveAnOrder_prod(order_id: string): Promise<any>;

  listAllOrders_prod(page: number, size: number): Promise<any>;

  updateAnOrder_prod(order_id: string, data: any): Promise<any>;

  deleteAnOrder_prod(order_id: string): Promise<any>;

  // --
  insertOrder_prod(): Promise<any>;

  saveOrderMetadata_prod(queryRunner: QueryRunner, orderId: string, metadatas: any): Promise<any>;

  saveLineItems_prod(queryRunner: QueryRunner, orderId: string, lineItems: any): Promise<any>;
}
