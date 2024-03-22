import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { IProductService } from '../../interfaces/product/product.interface';
import { CreateProductReqDto } from '../../dtos/req.dto';

@Injectable()
export class ProductService implements IProductService {
  constructor(@Inject('PRODUCT_SERVICE') private client: ClientProxy) {}

  // WooCommerce Staging Product APIs
  async createAProduct_stag(data: CreateProductReqDto): Promise<any> {
    const pattern = { cmd: 'createAProduct_stag' };
    const payload = data;
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
  async createAProduct_prod(data: CreateProductReqDto): Promise<any> {
    const pattern = { cmd: 'createAProduct_prod' };
    const payload = data;
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

  // --
  async insertProduct_prod(): Promise<any> {
    const pattern = { cmd: 'insertProduct_prod' };
    const payload = {};
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async insertProductImage_prod(): Promise<any> {
    const pattern = { cmd: 'insertProductImage_prod' };
    const payload = {};
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async insertProductAttribute_prod(): Promise<any> {
    const pattern = { cmd: 'insertProductAttribute_prod' };
    const payload = {};
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }
}
