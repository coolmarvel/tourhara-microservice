import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IProductTagService } from '../interfaces/tag/product-tag.interface';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductTagService implements IProductTagService {
  constructor(@Inject('PRODUCT_SERVICE') private client: ClientProxy) {}

  // WooCommerce Staging Product Tags APIs
  async createAProductTag_stag(data: any): Promise<any> {
    const pattern = { cmd: 'createAProductTag_stag' };
    const payload = data;
    const tag = await firstValueFrom(this.client.send(pattern, payload));

    return tag;
  }

  async retrieveAProductTag_stag(tag_id: string): Promise<any> {
    const pattern = { cmd: 'retrieveAProductTag_stag' };
    const payload = { tag_id };
    const tag = await firstValueFrom(this.client.send(pattern, payload));

    return tag;
  }

  async listAllProductTags_stag(page: number, size: number): Promise<any> {
    const pattern = { cmd: 'listAllProductTags_stag' };
    const payload = { page, size };
    const tags = await firstValueFrom(this.client.send(pattern, payload));

    return tags;
  }

  async updateAProductTag_stag(tag_id: string, data: any): Promise<any> {
    const pattern = { cmd: 'updateAProductTag_stag' };
    const payload = { tag_id, data };
    const tag = await firstValueFrom(this.client.send(pattern, payload));

    return tag;
  }

  async deleteAProductTag_stag(tag_id: string): Promise<any> {
    const pattern = { cmd: 'deleteAProductTag_stag' };
    const payload = { tag_id };
    const tag = await firstValueFrom(this.client.send(pattern, payload));

    return tag;
  }

  // WooCommerce Production Product Tags APIs
  async createAProductTag_prod(data: any): Promise<any> {
    const pattern = { cmd: 'createAProductTag_prod' };
    const payload = data;
    const tag = await firstValueFrom(this.client.send(pattern, payload));

    return tag;
  }

  async retrieveAProductTag_prod(tag_id: string): Promise<any> {
    const pattern = { cmd: 'retrieveAProductTag_prod' };
    const payload = { tag_id };
    const tag = await firstValueFrom(this.client.send(pattern, payload));

    return tag;
  }

  async listAllProductTags_prod(page: number, size: number): Promise<any> {
    const pattern = { cmd: 'listAllProductTags_prod' };
    const payload = { page, size };
    const tags = await firstValueFrom(this.client.send(pattern, payload));

    return tags;
  }

  async updateAProductTag_prod(tag_id: string, data: any): Promise<any> {
    const pattern = { cmd: 'updateAProductTag_prod' };
    const payload = { tag_id, data };
    const tag = await firstValueFrom(this.client.send(pattern, payload));

    return tag;
  }

  async deleteAProductTag_prod(tag_id: string): Promise<any> {
    const pattern = { cmd: 'deleteAProductTag_prod' };
    const payload = { tag_id };
    const tag = await firstValueFrom(this.client.send(pattern, payload));

    return tag;
  }

  async insertProductTag_prod() {
    const pattern = { cmd: 'insertProductTag_prod' };
    const payload = {};
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }
}
