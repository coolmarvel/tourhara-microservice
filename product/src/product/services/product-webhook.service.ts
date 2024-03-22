import { Injectable } from '@nestjs/common';
import { IProductWebhookService } from '../interfaces/product-webhook.interface';

@Injectable()
export class ProductWebhookService implements IProductWebhookService {
  async productCreated_stag(payload: any): Promise<any> {
    console.log(payload);

    return true;
  }

  async productUpdated_stag(payload: any): Promise<any> {
    console.log(payload);

    return true;
  }

  async productDeleted_stag(payload: any): Promise<any> {
    console.log(payload);

    return true;
  }

  async productRestored_stag(payload: any): Promise<any> {
    console.log(payload);

    return true;
  }

  async productCreated_prod(payload: any): Promise<any> {
    console.log(payload);

    return true;
  }

  async productUpdated_prod(payload: any): Promise<any> {
    console.log(payload);

    return true;
  }

  async productDeleted_prod(payload: any): Promise<any> {
    console.log(payload);

    return true;
  }

  async productRestored_prod(payload: any): Promise<any> {
    console.log(payload);

    return true;
  }
}
