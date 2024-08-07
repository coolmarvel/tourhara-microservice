import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { IWebhookService } from '../interfaces/webhook.interface';

@Injectable()
export class WebhookService implements IWebhookService {
  constructor(@Inject('ORDER_SERVICE') private client: ClientProxy) {}

  async orderCreated(payload: any): Promise<any> {
    try {
      const pattern = { cmd: 'orderCreated' };

      return await firstValueFrom(this.client.send(pattern, payload));
    } catch (error) {
      throw error;
    }
  }

  async orderUpdated(payload: any): Promise<any> {
    try {
      const pattern = { cmd: 'orderUpdated' };

      return await firstValueFrom(this.client.send(pattern, payload));
    } catch (error) {
      throw error;
    }
  }

  async orderDeleted(payload: any): Promise<any> {
    try {
      const pattern = { cmd: 'orderDeleted' };

      return await firstValueFrom(this.client.send(pattern, payload));
    } catch (error) {
      throw error;
    }
  }

  async orderRestored(payload: any): Promise<any> {
    try {
      const pattern = { cmd: 'orderRestored' };

      return await firstValueFrom(this.client.send(pattern, payload));
    } catch (error) {
      throw error;
    }
  }
}
