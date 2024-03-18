import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IProductAttributeService } from '../interfaces/product-attribute.interface';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductAttributeServcie implements IProductAttributeService {
  constructor(@Inject('PRODUCT_SERVICE') private client: ClientProxy) {}

  // WooCommerce Staging Product Attribute APIs
  async createAProductAttribute_stag(data: any): Promise<any> {
    const pattern = { cmd: 'createAProductAttribute_stag' };
    const payload = data;
    const attribute = await firstValueFrom(this.client.send(pattern, payload));

    return attribute;
  }

  async retrieveAProductAttribute_stag(attribute_id: string): Promise<any> {
    const pattern = { cmd: 'retrieveAProductAttribute_stag' };
    const payload = { attribute_id };
    const attribute = await firstValueFrom(this.client.send(pattern, payload));

    return attribute;
  }

  async listAllProductAttributes_stag(page: number, size: number): Promise<any> {
    const pattern = { cmd: 'listAllProductAttributes_stag' };
    const payload = { page, size };
    const attributes = await firstValueFrom(this.client.send(pattern, payload));

    return attributes;
  }

  async updateAProductAttribute_stag(attribute_id: string, data: any): Promise<any> {
    const pattern = { cmd: 'updateAProductAttribute_stag' };
    const payload = { attribute_id, data };
    const attribute = await firstValueFrom(this.client.send(pattern, payload));

    return attribute;
  }

  async deleteAProductAttribute_stag(attribute_id: string): Promise<any> {
    const pattern = { cmd: 'deleteAProductAttribute_stag' };
    const payload = { attribute_id };
    const attribute = await firstValueFrom(this.client.send(pattern, payload));

    return attribute;
  }

  // WooCommerce Production Product Attribute APIs
  async createAProductAttribute_prod(data: any): Promise<any> {
    const pattern = { cmd: 'createAProductAttribute_prod' };
    const payload = data;
    const attribute = await firstValueFrom(this.client.send(pattern, payload));

    return attribute;
  }

  async retrieveAProductAttribute_prod(attribute_id: string): Promise<any> {
    const pattern = { cmd: 'retrieveAProductAttribute_prod' };
    const payload = { attribute_id };
    const attribute = await firstValueFrom(this.client.send(pattern, payload));

    return attribute;
  }

  async listAllProductAttributes_prod(page: number, size: number): Promise<any> {
    const pattern = { cmd: 'listAllProductAttributes_prod' };
    const payload = { page, size };
    const attributes = await firstValueFrom(this.client.send(pattern, payload));

    return attributes;
  }

  async updateAProductAttribute_prod(attribute_id: string, data: any): Promise<any> {
    const pattern = { cmd: 'updateAProductAttribute_prod' };
    const payload = { attribute_id, data };
    const attribute = await firstValueFrom(this.client.send(pattern, payload));

    return attribute;
  }

  async deleteAProductAttribute_prod(attribute_id: string): Promise<any> {
    const pattern = { cmd: 'deleteAProductAttribute_prod' };
    const payload = { attribute_id };
    const attribute = await firstValueFrom(this.client.send(pattern, payload));

    return attribute;
  }
}
