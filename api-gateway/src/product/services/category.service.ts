import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { ICategoryService } from '../interfaces/category.interface';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(@Inject('PRODUCT_SERVICE') private client: ClientProxy) {}

  async createAProductCategory(data: any): Promise<any> {
    try {
      const pattern = { cmd: 'createAProductCategory' };

      return await firstValueFrom(this.client.send(pattern, data));
    } catch (error) {
      throw error;
    }
  }

  async retrieveAProductCategory(category_id: number): Promise<any> {
    try {
      const pattern = { cmd: 'retrieveAProductCategory' };
      const payload = { category_id };

      return await firstValueFrom(this.client.send(pattern, payload));
    } catch (error) {
      throw error;
    }
  }

  async listAllProductCategories(page: number, size: number): Promise<any> {
    try {
      const pattern = { cmd: 'listAllProductCategories' };
      const payload = { page, size };

      return await firstValueFrom(this.client.send(pattern, payload));
    } catch (error) {
      throw error;
    }
  }

  async updateAProductCategory(category_id: number, data: any): Promise<any> {
    try {
      const pattern = { cmd: 'updateAProductCategory' };
      const payload = { category_id, data };

      return await firstValueFrom(this.client.send(pattern, payload));
    } catch (error) {
      throw error;
    }
  }

  async deleteAProductCategory(category_id: number): Promise<any> {
    try {
      const pattern = { cmd: 'deleteAProductCategory' };
      const payload = { category_id };

      return await firstValueFrom(this.client.send(pattern, payload));
    } catch (error) {
      throw error;
    }
  }
}
