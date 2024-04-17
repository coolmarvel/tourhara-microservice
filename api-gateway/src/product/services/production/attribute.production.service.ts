import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { IAttributeService } from 'src/product/interfaces/attribute.interface';

@Injectable()
export class AttributeProductionService implements IAttributeService {
  constructor(@Inject('PRODUCT_SERVICE') private client: ClientProxy) {}

  async createAProductAttribute(data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const pattern = { cmd: 'createAProductAttribute_production' };
        const payload = data;
        const result = await firstValueFrom(this.client.send(pattern, payload));

        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async retrieveAProductAttribute(attribute_id: string | number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const pattern = { cmd: 'retrieveAProductAttribute_production' };
        const payload = { attribute_id };
        const result = await firstValueFrom(this.client.send(pattern, payload));

        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async listAllProductAttributes(page: number, size: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const pattern = { cmd: 'listAllProductAttributes_production' };
        const payload = { page, size };
        const result = await firstValueFrom(this.client.send(pattern, payload));

        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async updateAProductAttribute(attribute_id: string | number, data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const pattern = { cmd: 'updateAProductAttribute_production' };
        const payload = { attribute_id, data };
        const result = await firstValueFrom(this.client.send(pattern, payload));

        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async deleteAProductAttribute(attribute_id: string | number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const pattern = { cmd: 'deleteAProductAttribute_production' };
        const payload = { attribute_id };
        const result = await firstValueFrom(this.client.send(pattern, payload));

        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  }
}
