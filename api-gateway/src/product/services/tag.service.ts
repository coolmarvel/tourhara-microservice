import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { ITagService } from '../interfaces/tag.interface';

@Injectable()
export class TagService implements ITagService {
  constructor(@Inject('PRODUCT_SERVICE') private client: ClientProxy) {}

  async createAProductTag(data: any): Promise<any> {
    try {
      const pattern = { cmd: 'createAProductTag' };

      return await firstValueFrom(this.client.send(pattern, data));
    } catch (error) {
      throw error;
    }
  }

  async retrieveAProductTag(tag_id: number): Promise<any> {
    try {
      const pattern = { cmd: 'retrieveAProductTag' };
      const payload = { tag_id };

      return await firstValueFrom(this.client.send(pattern, payload));
    } catch (error) {
      throw error;
    }
  }

  async listAllProductTags(page: number, size: number): Promise<any> {
    try {
      const pattern = { cmd: 'listAllProductTags' };
      const payload = { page, size };

      return await firstValueFrom(this.client.send(pattern, payload));
    } catch (error) {
      throw error;
    }
  }

  async updateAProductTag(tag_id: number, data: any): Promise<any> {
    try {
      const pattern = { cmd: 'updateAProductTag' };
      const payload = { tag_id, data };

      return await firstValueFrom(this.client.send(pattern, payload));
    } catch (error) {
      throw error;
    }
  }

  async deleteAProductTag(tag_id: number): Promise<any> {
    try {
      const pattern = { cmd: 'deleteAProductTag' };
      const payload = { tag_id };

      return await firstValueFrom(this.client.send(pattern, payload));
    } catch (error) {
      throw error;
    }
  }
}
