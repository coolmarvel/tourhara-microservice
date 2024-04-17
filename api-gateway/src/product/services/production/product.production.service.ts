import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { IProductService } from 'src/product/interfaces/product.interface';

@Injectable()
export class ProductProductionService implements IProductService {
  constructor(@Inject('PRODUCT_SERVICE') private client: ClientProxy) {}

  async createAProduct(data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const pattern = { cmd: 'createAProduct_production' };
        const payload = data;
        const result = await firstValueFrom(this.client.send(pattern, payload));

        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async retrieveAProduct(product_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const pattern = { cmd: 'retrieveAProduct_production' };
        const payload = { product_id };
        const result = await firstValueFrom(this.client.send(pattern, payload));

        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async listAllProducts(page: number, size: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const pattern = { cmd: 'listAllProducts_production' };
        const payload = { page, size };
        const result = await firstValueFrom(this.client.send(pattern, payload));

        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async updateAProduct(product_id: number, data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const pattern = { cmd: 'updateAProduct_production' };
        const payload = { product_id, data };
        const result = await firstValueFrom(this.client.send(pattern, payload));

        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async deleteAProduct(product_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const pattern = { cmd: 'deleteAProduct_production' };
        const payload = { product_id };
        const result = await firstValueFrom(this.client.send(pattern, payload));

        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async productCreated(payload: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const pattern = { cmd: 'productCreated_production' };
        const result = await firstValueFrom(this.client.send(pattern, payload));

        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async productUpdated(payload: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const pattern = { cmd: 'productUpdated_production' };
        const result = await firstValueFrom(this.client.send(pattern, payload));

        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async productDeleted(payload: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const pattern = { cmd: 'productDeleted_production' };
        const result = await firstValueFrom(this.client.send(pattern, payload));

        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async productRestored(payload: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const pattern = { cmd: 'productRestored_production' };
        const result = await firstValueFrom(this.client.send(pattern, payload));

        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  }
}
