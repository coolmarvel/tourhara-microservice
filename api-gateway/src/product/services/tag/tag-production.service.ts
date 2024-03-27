import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ITagProductionService } from 'src/product/interfaces/tag/tag-production.interface';

@Injectable()
export class TagProductionService implements ITagProductionService {
  constructor(@Inject('PRODUCT_SERVICE') private client: ClientProxy) {}

  async createAProductTag(data: any): Promise<any> {
    const pattern = { cmd: 'createAProductTag_woocommerce_production' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async retrieveAProductTag(tag_id: number): Promise<any> {
    const pattern = { cmd: 'retrieveAProductTag_woocommerce_production' };
    const payload = { tag_id };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async listAllProductTags(page: number, size: number): Promise<any> {
    const pattern = { cmd: 'listAllProductTags_woocommerce_production' };
    const payload = { page, size };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async updateAProductTag(tag_id: number, data: any): Promise<any> {
    const pattern = { cmd: 'updateAProductTag_woocommerce_production' };
    const payload = { tag_id, data };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async deleteAProductTag(tag_id: number): Promise<any> {
    const pattern = { cmd: 'deleteAProductTag_woocommerce_production' };
    const payload = { tag_id };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }
}
