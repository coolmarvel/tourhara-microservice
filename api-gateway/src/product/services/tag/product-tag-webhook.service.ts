import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { IProductTagWebhookService } from 'src/product/interfaces/tag/product-tag-webhook.interface';

@Injectable()
export class ProductTagWebhookService implements IProductTagWebhookService {
  constructor(@Inject('PRODUCT_SERVICE') private readonly client: ClientProxy) {}

  async productTagCreated_stag(data: any): Promise<any> {
    const pattern = { cmd: 'productTagCreated_stag' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async productTagUpdated_stag(data: any): Promise<any> {
    const pattern = { cmd: 'productTagUpdated_stag' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async productTagDeleted_stag(data: any): Promise<any> {
    const pattern = { cmd: 'productTagDeleted_stag' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async productTagRestored_stag(data: any): Promise<any> {
    const pattern = { cmd: 'productTagRestored_stag' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async productTagCreated_prod(data: any): Promise<any> {
    const pattern = { cmd: 'productTagCreated_prod' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async productTagUpdated_prod(data: any): Promise<any> {
    const pattern = { cmd: 'productTagUpdated_prod' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async productTagDeleted_prod(data: any): Promise<any> {
    const pattern = { cmd: 'productTagDeleted_prod' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async productTagRestored_prod(data: any): Promise<any> {
    const pattern = { cmd: 'productTagRestored_prod' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }
}
