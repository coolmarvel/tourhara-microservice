import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { IProductProductionService } from 'src/woocommerce/product/interfaces/product/product-production.interface';

@Injectable()
export class ProductProductionService implements IProductProductionService {
  constructor(@Inject('PRODUCT_SERVICE') private client: ClientProxy) {}

  /**
   * WooCommerce
   */
  async createAProduct(data: any): Promise<any> {
    const pattern = { cmd: 'createAProduct_woocommerce_production' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async retrieveAProduct(product_id: number): Promise<any> {
    const pattern = { cmd: 'retrieveAProduct_woocommerce_production' };
    const payload = { product_id };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async listAllProducts(page: number, size: number): Promise<any> {
    const pattern = { cmd: 'listAllProducts_woocommerce_production' };
    const payload = { page, size };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async updateAProduct(product_id: number, data: any): Promise<any> {
    const pattern = { cmd: 'updateAProduct_woocommerce_production' };
    const payload = { product_id, data };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async deleteAProduct(product_id: number): Promise<any> {
    const pattern = { cmd: 'deleteAProduct_woocommerce_production' };
    const payload = { product_id };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  /**
   * Synchronize
   */
  async synchronizeProduct(): Promise<any> {
    const pattern = { cmd: 'synchronizeProduct_woocommerce_production' };
    const payload = {};
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  /**
   * Webhook
   */
  async productCreated(payload: any): Promise<any> {
    const pattern = { cmd: 'productCreated_production' };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async productUpdated(payload: any): Promise<any> {
    const pattern = { cmd: 'productUpdated_production' };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async productDeleted(payload: any): Promise<any> {
    const pattern = { cmd: 'productDeleted_production' };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async productRestored(payload: any): Promise<any> {
    const pattern = { cmd: 'productRestored_production' };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }
}
