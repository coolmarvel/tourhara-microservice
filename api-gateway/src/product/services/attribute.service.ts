import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { IAttributeService } from '../interfaces/attribute.interface';

@Injectable()
export class AttributeService implements IAttributeService {
  constructor(@Inject('PRODUCT_SERVICE') private client: ClientProxy) {}

  async createAProductAttribute(data: any): Promise<any> {
    try {
      const pattern = { cmd: 'createAProductAttribute' };

      return await firstValueFrom(this.client.send(pattern, data));
    } catch (error) {
      throw error;
    }
  }

  async retrieveAProductAttribute(attribute_id: string | number): Promise<any> {
    try {
      const pattern = { cmd: 'retrieveAProductAttribute' };
      const payload = { attribute_id };

      return await firstValueFrom(this.client.send(pattern, payload));
    } catch (error) {
      throw error;
    }
  }

  async listAllProductAttributes(page: number, size: number): Promise<any> {
    try {
      const pattern = { cmd: 'listAllProductAttributes' };
      const payload = { page, size };

      return await firstValueFrom(this.client.send(pattern, payload));
    } catch (error) {
      throw error;
    }
  }

  async updateAProductAttribute(attribute_id: string | number, data: any): Promise<any> {
    try {
      const pattern = { cmd: 'updateAProductAttribute' };
      const payload = { attribute_id, data };

      return await firstValueFrom(this.client.send(pattern, payload));
    } catch (error) {
      throw error;
    }
  }

  async deleteAProductAttribute(attribute_id: string | number): Promise<any> {
    try {
      const pattern = { cmd: 'deleteAProductAttribute' };
      const payload = { attribute_id };

      return await firstValueFrom(this.client.send(pattern, payload));
    } catch (error) {
      throw error;
    }
  }
}
