import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { IProductService } from '../interfaces/product.interface';

@Injectable()
export class ProductService implements IProductService {
  constructor(@Inject('PRODUCT_SERVICE') private client: ClientProxy) {}

  // WooCommerce Staging Product APIs
  async createAProduct_stag(name: string, type: string, regular_price: string, description: string, short_description: string, categories: object, images: object): Promise<any> {
    const pattern = { cmd: 'createAProduct_stag' };
    const payload = { name, type, regular_price, description, short_description, categories, images };
    const product = await firstValueFrom(this.client.send(pattern, payload));

    return product;
  }

  async retrieveAProduct_stag(product_id: string): Promise<any> {
    const pattern = { cmd: 'retrieveAProduct_stag' };
    const payload = { product_id };
    const product = await firstValueFrom(this.client.send(pattern, payload));

    return product;
  }

  async listAllProducts_stag(page: number, size: number): Promise<any> {
    const pattern = { cmd: 'listAllProducts_stag' };
    const payload = { page, size };
    const products = await firstValueFrom(this.client.send(pattern, payload));

    return products;
  }

  async updateAProduct_stag(product_id: string, data: any): Promise<any> {
    const pattern = { cmd: 'updateAProduct_stag' };
    const payload = { product_id, data };
    const product = await firstValueFrom(this.client.send(pattern, payload));

    return product;
  }

  async deleteAProduct_stag(product_id: string): Promise<any> {
    const pattern = { cmd: 'deleteAProduct_stag' };
    const payload = { product_id };
    const product = await firstValueFrom(this.client.send(pattern, payload));

    return product;
  }

  // WooCommerce Production Product APIs
  async createAProduct_prod(name: string, type: string, regular_price: string, description: string, short_description: string, categories: object, images: object): Promise<any> {
    const pattern = { cmd: 'createAProduct_prod' };
    const payload = { name, type, regular_price, description, short_description, categories, images };
    const product = await firstValueFrom(this.client.send(pattern, payload));

    return product;
  }

  async retrieveAProduct_prod(product_id: string): Promise<any> {
    const pattern = { cmd: 'retrieveAProduct_prod' };
    const payload = { product_id };
    const product = await firstValueFrom(this.client.send(pattern, payload));

    return product;
  }

  async listAllProducts_prod(page: number, size: number) {
    const pattern = { cmd: 'listAllProducts_prod' };
    const payload = { page, size };
    const products = await firstValueFrom(this.client.send(pattern, payload));

    return products;
  }

  async updateAProduct_prod(product_id: string, data: any): Promise<any> {
    const pattern = { cmd: 'updateAProduct_prod' };
    const payload = { product_id, data };
    const product = await firstValueFrom(this.client.send(pattern, payload));

    return product;
  }

  async deleteAProduct_prod(product_id: string): Promise<any> {
    const pattern = { cmd: 'deleteAProduct_prod' };
    const payload = { product_id };
    const product = await firstValueFrom(this.client.send(pattern, payload));

    return product;
  }
}
