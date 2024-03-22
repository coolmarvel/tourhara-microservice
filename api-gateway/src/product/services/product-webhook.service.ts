import { Inject, Injectable } from '@nestjs/common';
import { IProductWebhookService } from '../interfaces/product/product-webhook.interface';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProductWebhookService implements IProductWebhookService {
  constructor(@Inject('PRODUCT_SERVICE') private client: ClientProxy) {}

  async productCreated_stag(data: any): Promise<any> {
    const pattern = { cmd: 'productCreated_stag' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async productUpdated_stag(data: any): Promise<any> {
    const pattern = { cmd: 'productUpdated_stag' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async productDeleted_stag(data: any): Promise<any> {
    const pattern = { cmd: 'productDeleted_stag' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async productRestored_stag(data: any): Promise<any> {
    const pattern = { cmd: 'productRestored_stag' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async productCreated_prod(data: any): Promise<any> {
    const pattern = { cmd: 'productCreated_prod' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async productUpdated_prod(data: any): Promise<any> {
    const pattern = { cmd: '' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async productDeleted_prod(data: any): Promise<any> {
    const pattern = { cmd: 'productDeleted_prod' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async productRestored_prod(data: any): Promise<any> {
    const pattern = { cmd: 'productRestored_prod' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }
}
