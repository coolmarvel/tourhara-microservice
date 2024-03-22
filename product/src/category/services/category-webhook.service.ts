import { Injectable } from '@nestjs/common';
import { ICategoryWebhookService } from '../interfaces/category-webhook.interface';

@Injectable()
export class CategoryWebhookService implements ICategoryWebhookService {
  async productCategoryCreated_stag(payload: any): Promise<any> {
    console.log(payload);

    return true;
  }

  async productCategoryUpdated_stag(payload: any): Promise<any> {
    console.log(payload);

    return true;
  }

  async productCategoryDeleted_stag(payload: any): Promise<any> {
    console.log(payload);

    return true;
  }

  async productCategoryRestored_stag(payload: any): Promise<any> {
    console.log(payload);

    return true;
  }

  async productCategoryCreated_prod(payload: any): Promise<any> {
    console.log(payload);

    return true;
  }

  async productCategoryUpdated_prod(payload: any): Promise<any> {
    console.log(payload);

    return true;
  }

  async productCategoryDeleted_prod(payload: any): Promise<any> {
    console.log(payload);

    return true;
  }

  async productCategoryRestored_prod(payload: any): Promise<any> {
    console.log(payload);

    return true;
  }
}
