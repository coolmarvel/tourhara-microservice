import { Inject, Injectable } from '@nestjs/common';
import { IOrderWebhookService } from '../interfaces/order-webhook.interface';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrderWebhookService implements IOrderWebhookService {
  constructor(@Inject('ORDER_SERVICE') private readonly client: ClientProxy) {}

  async orderCreated_stag(data: any): Promise<any> {
    const pattern = { cmd: 'orderCreated_stag' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async orderUpdated_stag(data: any): Promise<any> {
    const pattern = { cmd: 'orderUpdated_stag' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async orderDeleted_stag(data: any): Promise<any> {
    const pattern = { cmd: 'orderDeleted_stag' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async orderRestored_stag(data: any): Promise<any> {
    const pattern = { cmd: 'orderRestored_stag' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async orderCreated_prod(data: any): Promise<any> {
    const pattern = { cmd: 'orderCreated_prod' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async orderUpdated_prod(data: any): Promise<any> {
    const pattern = { cmd: 'orderUpdated_prod' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async orderDeleted_prod(data: any): Promise<any> {
    const pattern = { cmd: 'orderDeleted_prod' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async orderRestored_prod(data: any): Promise<any> {
    const pattern = { cmd: 'orderRestored_prod' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }
}
