import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { IAdapterService } from '../interfaces/adapter.interface';

@Injectable()
export class AdapterService implements IAdapterService {
  constructor(@Inject('ADAPTER_SERVICE') private client: ClientProxy) {}

  async getAllTypes(): Promise<any> {
    try {
      const pattern = { cmd: 'getAllTypes' };
      const payload = {};

      return await firstValueFrom(this.client.send(pattern, payload));
    } catch (error) {
      throw error;
    }
  }

  async getAllNotDeclaredCategories(): Promise<any> {
    try {
      const pattern = { cmd: 'getAllNotDeclaredCategories' };
      const payload = {};

      return await firstValueFrom(this.client.send(pattern, payload));
    } catch (error) {
      throw error;
    }
  }

  async getAllDeclaredCategories(type_id: number): Promise<any> {
    try {
      const pattern = { cmd: 'getAllDeclaredCategories' };
      const payload = { type_id };

      return await firstValueFrom(this.client.send(pattern, payload));
    } catch (error) {
      throw error;
    }
  }

  async updateCategoryByType(type_id: number, category_id: number): Promise<any> {
    try {
      const pattern = { cmd: 'updateCategoryByType' };
      const payload = { type_id, category_id };

      return await firstValueFrom(this.client.send(pattern, payload));
    } catch (error) {
      throw error;
    }
  }

  async getOrdersByProductId(product_id: string, after: string, before: string): Promise<any> {
    try {
      const pattern = { cmd: 'getOrdersByProductId' };
      const payload = { product_id, after, before };

      return await firstValueFrom(this.client.send(pattern, payload));
    } catch (error) {
      throw error;
    }
  }

  async getOrderByProductIdAndOrderId(product_id: string, order_id: string): Promise<any> {
    try {
      const pattern = { cmd: 'getOrderByProductIdAndOrderId' };
      const payload = { product_id, order_id };

      return await firstValueFrom(this.client.send(pattern, payload));
    } catch (error) {
      throw error;
    }
  }
}
