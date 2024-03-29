import { Injectable } from '@nestjs/common';
import { IOrderProductionService } from '../interfaces/order-production.interface';
import { QueryRunner } from 'typeorm';

@Injectable()
export class OrderProductionService implements IOrderProductionService {
  async retrieveAnOrder(order_id: number): Promise<any> {
    try {
      return true;
    } catch (error) {
      throw error;
    }
  }

  async listAllOrders(page: number, size: number): Promise<any> {
    try {
      return true;
    } catch (error) {
      throw error;
    }
  }

  async updateAnOrder(order_id: number, data: any): Promise<any> {
    try {
      return true;
    } catch (error) {
      throw error;
    }
  }

  async deleteAnOrder(order_id: number): Promise<any> {
    try {
      return true;
    } catch (error) {
      throw error;
    }
  }

  async synchronizeOrder(): Promise<any> {
    try {
      return true;
    } catch (error) {
      throw error;
    }
  }

  async insert(queryRunner: QueryRunner): Promise<any> {
    try {
      return true;
    } catch (error) {
      throw error;
    }
  }

  async update(queryRunner: QueryRunner): Promise<any> {
    try {
      return true;
    } catch (error) {
      throw error;
    }
  }

  async select(queryRunner: QueryRunner): Promise<any> {
    try {
      return true;
    } catch (error) {
      throw error;
    }
  }

  async delete(queryRunner: QueryRunner): Promise<any> {
    try {
      return true;
    } catch (error) {
      throw error;
    }
  }

  async orderCreated(payload: any): Promise<any> {
    try {
      return true;
    } catch (error) {
      throw error;
    }
  }

  async orderUpdated(payload: any): Promise<any> {
    try {
      return true;
    } catch (error) {
      throw error;
    }
  }

  async orderDeleted(payload: any): Promise<any> {
    try {
      return true;
    } catch (error) {
      throw error;
    }
  }

  async orderRestored(payload: any): Promise<any> {
    try {
      return true;
    } catch (error) {
      throw error;
    }
  }
}
