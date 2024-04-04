import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { IOrderService } from '../interfaces/order.interface';

@Injectable()
export class OrderProductionService implements IOrderService {
  createAnOrder(payload: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  retrieveAnOrder(order_id: number): Promise<any> {
    throw new Error('Method not implemented.');
  }
  listAllOrders(page: number, size: number, date: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  updateAnOrder(order_id: number, data: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  deleteAnOrder(order_id: number): Promise<any> {
    throw new Error('Method not implemented.');
  }
  synchronizeOrder(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  insert(queryRunner: QueryRunner, order: any, metadata: any, orderId: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  update(queryRunner: QueryRunner): Promise<any> {
    throw new Error('Method not implemented.');
  }
  select(queryRunner: QueryRunner): Promise<any> {
    throw new Error('Method not implemented.');
  }
  delete(queryRunner: QueryRunner): Promise<any> {
    throw new Error('Method not implemented.');
  }
  orderCreated(payload: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  orderUpdated(payload: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  orderDeleted(payload: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  orderRestored(payload: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
