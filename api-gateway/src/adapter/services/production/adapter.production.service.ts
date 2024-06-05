import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { IAdapterService } from 'src/adapter/interfaces/adapter.interface';

@Injectable()
export class AdapterProductionService implements IAdapterService {
  constructor(@Inject('ADAPTER_SERVICE') private client: ClientProxy) {}

  async getAllTypes(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const pattern = { cmd: 'getAllTypes_production' };
        const payload = {};
        const result = await firstValueFrom(this.client.send(pattern, payload));

        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async getAllNotDeclaredCategories(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const pattern = { cmd: 'getAllNotDeclaredCategories_production' };
        const payload = {};
        const result = await firstValueFrom(this.client.send(pattern, payload));

        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async getAllDeclaredCategories(type_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const pattern = { cmd: 'getAllDeclaredCategories_production' };
        const payload = { type_id };
        const result = await firstValueFrom(this.client.send(pattern, payload));

        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async updateCategoryByType(type_id: number, category_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const pattern = { cmd: 'updateCategoryByType_production' };
        const payload = { type_id, category_id };
        const result = await firstValueFrom(this.client.send(pattern, payload));

        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async getAdaptedOrders(type_id: number, category_id: number, start_date: string, end_date: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const pattern = { cmd: 'getAdaptedOrders_production' };
        const payload = { type_id, category_id, start_date, end_date };
        const result = await firstValueFrom(this.client.send(pattern, payload));

        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async getAllProducts(type_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const pattern = { cmd: 'getAllProducts_production' };
        const payload = { type_id };
        const result = await firstValueFrom(this.client.send(pattern, payload));

        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  }

  getOrdersByProductName(product_name: string, start_date: string, end_date: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const pattern = { cmd: 'getOrdersByProductName_production' };
        const payload = { product_name, start_date, end_date };
        const result = await firstValueFrom(this.client.send(pattern, payload));

        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  }

  getOrdersByCategory(category_id: string, after: string, before: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const pattern = { cmd: 'getOrdersByCategory_production' };
        const payload = { category_id, after, before };
        const result = await firstValueFrom(this.client.send(pattern, payload));

        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  }
}
