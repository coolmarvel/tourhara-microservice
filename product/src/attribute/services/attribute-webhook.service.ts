import { Injectable } from '@nestjs/common';
import { IAttributeWebhookService } from '../interfaces/attribute-webhook.interface';

@Injectable()
export class AttributeWebhookService implements IAttributeWebhookService {
  async productAttributeCreated_stag(payload: any): Promise<any> {
    console.log(payload);

    return true;
  }

  async productAttributeUpdated_stag(payload: any): Promise<any> {
    console.log(payload);

    return true;
  }

  async productAttributeDeleted_stag(payload: any): Promise<any> {
    console.log(payload);

    return true;
  }

  async productAttributeRestored_stag(payload: any): Promise<any> {
    console.log(payload);

    return true;
  }

  async productAttributeCreated_prod(payload: any): Promise<any> {
    console.log(payload);

    return true;
  }

  async productAttributeUpdated_prod(payload: any): Promise<any> {
    console.log(payload);

    return true;
  }

  async productAttributeDeleted_prod(payload: any): Promise<any> {
    console.log(payload);

    return true;
  }

  async productAttributeRestored_prod(payload: any): Promise<any> {
    console.log(payload);

    return true;
  }
}
