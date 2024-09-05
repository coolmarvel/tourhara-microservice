import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { IProductService } from '../interfaces/product.interface';

@Injectable()
export class ProductService implements IProductService {
  constructor(@Inject('PRODUCT_SERVICE') private client: ClientProxy) {}

  async createAProduct(data: any): Promise<any> {
    try {
      const pattern = { cmd: 'createAProduct' };

      return await firstValueFrom(this.client.send(pattern, data));
    } catch (error) {
      throw error;
    }
  }

  async retrieveAProduct(product_id: number): Promise<any> {
    try {
      const pattern = { cmd: 'retrieveAProduct' };
      const payload = { product_id };

      return await firstValueFrom(this.client.send(pattern, payload));
    } catch (error) {
      throw error;
    }
  }

  async listAllProducts(page: number, size: number): Promise<any> {
    try {
      const pattern = { cmd: 'listAllProducts' };
      const payload = { page, size };

      return await firstValueFrom(this.client.send(pattern, payload));
    } catch (error) {
      throw error;
    }
  }

  async updateAProduct(product_id: number, data: any): Promise<any> {
    try {
      const pattern = { cmd: 'updateAProduct' };
      const payload = { product_id, data };

      return await firstValueFrom(this.client.send(pattern, payload));
    } catch (error) {
      throw error;
    }
  }

  async deleteAProduct(product_id: number): Promise<any> {
    try {
      const pattern = { cmd: 'deleteAProduct' };
      const payload = { product_id };

      return await firstValueFrom(this.client.send(pattern, payload));
    } catch (error) {
      throw error;
    }
  }
}
