import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { IProductCategoryWebhookService } from 'src/woocommerce/product/interfaces/category/product-category-webhook.interface';

@Injectable()
export class ProductCategoryWebhookService implements IProductCategoryWebhookService {
  constructor(@Inject('PRODUCT_SERVICE') private readonly client: ClientProxy) {}

  async productCategoryCreated_stag(data: any): Promise<any> {
    const pattern = { cmd: 'productCategoryCreated_stag' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async productCategoryUpdated_stag(data: any): Promise<any> {
    const pattern = { cmd: 'productCategoryUpdated_stag' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async productCategoryDeleted_stag(data: any): Promise<any> {
    const pattern = { cmd: 'productCategoryDeleted_stag' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async productCategoryRestored_stag(data: any): Promise<any> {
    const pattern = { cmd: 'productCategoryRestored_stag' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async productCategoryCreated_prod(data: any): Promise<any> {
    const pattern = { cmd: 'productCategoryCreated_prod' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async productCategoryUpdated_prod(data: any): Promise<any> {
    const pattern = { cmd: 'productCategoryUpdated_prod' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async productCategoryDeleted_prod(data: any): Promise<any> {
    const pattern = { cmd: 'productCategoryDeleted_prod' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async productCategoryRestored_prod(data: any): Promise<any> {
    const pattern = { cmd: 'productCategoryRestored_prod' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }
}
