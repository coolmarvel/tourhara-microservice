import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { IProductStagingService } from 'src/woocommerce/product/interfaces/product/product-staging.interface';

@Injectable()
export class ProductStagingService implements IProductStagingService {
  constructor(@Inject('PRODUCT_SERVICE') private client: ClientProxy) {}

  /**
   * WooCommerce
   */
  async createAProduct(data: any): Promise<any> {
    const pattern = { cmd: 'createAProduct_woocommerce_staging' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async retrieveAProduct(product_id: number): Promise<any> {
    const pattern = { cmd: 'retrieveAProduct_woocommerce_staging' };
    const payload = { product_id };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async listAllProducts(page: number, size: number): Promise<any> {
    const pattern = { cmd: 'listAllProducts_woocommerce_staging' };
    const payload = { page, size };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async updateAProduct(product_id: number, data: any): Promise<any> {
    const pattern = { cmd: 'updateAProduct_woocommerce_staging' };
    const payload = { product_id, data };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async deleteAProduct(product_id: number): Promise<any> {
    const pattern = { cmd: 'deleteAProduct_woocommerce_staging' };
    const payload = { product_id };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  /**
   * Database
   */
  async synchronizeProduct(): Promise<any> {
    const pattern = { cmd: 'synchronizeProduct_woocommerce_staging' };
    const payload = {};
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  /**
   * Webhook
   */
  async productCreated(payload: any): Promise<any> {
    const pattern = { cmd: 'productCreated_staging' };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async productUpdated(payload: any): Promise<any> {
    const pattern = { cmd: 'productUpdated_staging' };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async productDeleted(payload: any): Promise<any> {
    const pattern = { cmd: 'productDeleted_staging' };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async productRestored(payload: any): Promise<any> {
    const pattern = { cmd: 'productRestored_staging' };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }
}
