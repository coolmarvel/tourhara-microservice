import { Injectable } from '@nestjs/common';
import { ITagWebhookService } from '../interfaces/tag-webhook.interface';

@Injectable()
export class TagWebhookService implements ITagWebhookService {
  async productTagCreated_stag(payload: any): Promise<any> {
    console.log(payload);

    return true;
  }

  async productTagUpdated_stag(payload: any): Promise<any> {
    console.log(payload);

    return true;
  }

  async productTagDeleted_stag(payload: any): Promise<any> {
    console.log(payload);

    return true;
  }

  async productTagRestored_stag(payload: any): Promise<any> {
    console.log(payload);

    return true;
  }

  async productTagCreated_prod(payload: any): Promise<any> {
    console.log(payload);

    return true;
  }

  async productTagUpdated_prod(payload: any): Promise<any> {
    console.log(payload);

    return true;
  }

  async productTagDeleted_prod(payload: any): Promise<any> {
    console.log(payload);

    return true;
  }

  async productTagRestored_prod(payload: any): Promise<any> {
    console.log(payload);

    return true;
  }
}
