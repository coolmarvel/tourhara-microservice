import { QueryRunner } from 'typeorm';

export interface IOrderService {
  /**
   * WooCommerce
   */
  createAnOrder(payload: any): Promise<any>;

  retrieveAnOrder(order_id: number): Promise<any>;

  listAllOrders(page: number, size: number, date: string): Promise<any>;

  updateAnOrder(order_id: number, data: any): Promise<any>;

  deleteAnOrder(order_id: number): Promise<any>;

  /**
   * Synchronize
   */
  synchronizeOrder(errorNumber: number): Promise<any>;

  insert(queryRunner: QueryRunner, order: any, metadata: any, orderId: string): Promise<any>;

  update(queryRunner: QueryRunner): Promise<any>;

  select(queryRunner: QueryRunner): Promise<any>;

  delete(queryRunner: QueryRunner): Promise<any>;

  /**
   * Webhook
   */
  orderCreated(payload: any): Promise<any>;

  orderUpdated(payload: any): Promise<any>;

  orderDeleted(payload: any): Promise<any>;

  orderRestored(payload: any): Promise<any>;
}
