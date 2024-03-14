import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductService {
  constructor(@Inject('PRODUCT_SERVICE') private client: ClientProxy) {}

  // WooCommerce Staging Product APIs

  // WooCommerce Production Product APIs
  async listAllProducts_prod(page: number, size: number) {
    const pattern = { cmd: 'listAllProducts_prod' };
    const payload = { page, size };
    const products = await firstValueFrom(this.client.send(pattern, payload));

    return products;
  }
}
