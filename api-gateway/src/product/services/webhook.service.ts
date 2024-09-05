import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { IWebhookService } from '../interfaces/webhook.interface';

@Injectable()
export class WebhookService implements IWebhookService {
  constructor(@Inject('PRODUCT_SERVICE') private client: ClientProxy) {}

  async productCreated(payload: any): Promise<any> {
    try {
      const pattern = { cmd: 'productCreated' };

      return await firstValueFrom(this.client.send(pattern, payload));
    } catch (error) {
      throw error;
    }
  }

  async productUpdated(payload: any): Promise<any> {
    try {
      const pattern = { cmd: 'productUpdated' };

      return await firstValueFrom(this.client.send(pattern, payload));
    } catch (error) {
      throw error;
    }
  }

  async productDeleted(payload: any): Promise<any> {
    try {
      const pattern = { cmd: 'productDeleted' };

      return await firstValueFrom(this.client.send(pattern, payload));
    } catch (error) {
      throw error;
    }
  }

  async productRestored(payload: any): Promise<any> {
    try {
      const pattern = { cmd: 'productRestored' };

      return await firstValueFrom(this.client.send(pattern, payload));
    } catch (error) {
      throw error;
    }
  }
}
