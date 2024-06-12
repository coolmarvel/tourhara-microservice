import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { IAdapterService } from 'src/adapter/interfaces/adapter.interface';

@Injectable()
export class AdapterStagingService implements IAdapterService {
  constructor(@Inject('ADAPTER_SERVICE') private client: ClientProxy) {}

  getAllTypes(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const pattern = { cmd: 'getAllTypes_staging' };
        const payload = {};
        const result = await firstValueFrom(this.client.send(pattern, payload));

        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  }

  getAllNotDeclaredCategories(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const pattern = { cmd: 'getAllNotDeclaredCategories_staging' };
        const payload = {};
        const result = await firstValueFrom(this.client.send(pattern, payload));

        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  }

  getAllDeclaredCategories(type_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const pattern = { cmd: 'getAllDeclaredCategories_staging' };
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
        const pattern = { cmd: 'updateCategoryByType_staging' };
        const payload = { type_id, category_id };
        const result = await firstValueFrom(this.client.send(pattern, payload));

        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  }

  getOrdersByProductId(product_id: string, after: string, before: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const pattern = { cmd: 'getOrdersByProductId_staging' };
        const payload = { product_id, after, before };
        const result = await firstValueFrom(this.client.send(pattern, payload));

        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  }

  getOrderByProductIdAndOrderId(product_id: string, order_id: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const pattern = { cmd: 'getOrderByProductIdAndOrderId_staging' };
        const payload = { product_id, order_id };
        const result = await firstValueFrom(this.client.send(pattern, payload));

        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  }
}
