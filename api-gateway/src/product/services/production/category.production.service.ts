import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ICategoryService } from 'src/product/interfaces/category.interface';

@Injectable()
export class CategoryProductionService implements ICategoryService {
  constructor(@Inject('PRODUCT_SERVICE') private client: ClientProxy) {}

  async createAProductCategory(data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const pattern = { cmd: 'createAProductCategory_production' };
        const payload = data;
        const result = await firstValueFrom(this.client.send(pattern, payload));

        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async retrieveAProductCategory(category_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const pattern = { cmd: 'retrieveAProductCategory_production' };
        const payload = { category_id };
        const result = await firstValueFrom(this.client.send(pattern, payload));

        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async listAllProductCategories(page: number, size: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const pattern = { cmd: 'listAllProductCategories_production' };
        const payload = { page, size };
        const result = await firstValueFrom(this.client.send(pattern, payload));

        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async updateAProductCategory(category_id: number, data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const pattern = { cmd: 'updateAProductCategory_production' };
        const payload = { category_id, data };
        const result = await firstValueFrom(this.client.send(pattern, payload));

        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async deleteAProductCategory(category_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const pattern = { cmd: 'deleteAProductCategory_production' };
        const payload = { category_id };
        const result = await firstValueFrom(this.client.send(pattern, payload));

        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  }
}
