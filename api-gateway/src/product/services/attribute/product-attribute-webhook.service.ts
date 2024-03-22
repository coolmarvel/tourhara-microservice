import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { IProductAttributeWebhookService } from 'src/product/interfaces/attribute/product-attribute-webhook.interface';

@Injectable()
export class ProductAttributeWebhookService implements IProductAttributeWebhookService {
  constructor(@Inject('PRODUCT_SERVICE') private readonly client: ClientProxy) {}

  async productAttributeCreated_stag(data: any): Promise<any> {
    const pattern = { cmd: 'productAttributeCreated_stag' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async productAttributeUpdated_stag(data: any): Promise<any> {
    const pattern = { cmd: 'productAttributeUpdated_stag' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async productAttributeDeleted_stag(data: any): Promise<any> {
    const pattern = { cmd: 'productAttributeDeleted_stag' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async productAttributeRestored_stag(data: any): Promise<any> {
    const pattern = { cmd: 'productAttributeRestored_stag' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async productAttributeCreated_prod(data: any): Promise<any> {
    const pattern = { cmd: 'productAttributeCreated_prod' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async productAttributeUpdated_prod(data: any): Promise<any> {
    const pattern = { cmd: 'productAttributeUpdated_prod' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async productAttributeDeleted_prod(data: any): Promise<any> {
    const pattern = { cmd: 'productAttributeDeleted_prod' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async productAttributeRestored_prod(data: any): Promise<any> {
    const pattern = { cmd: 'productAttributeRestored_prod' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }
}
