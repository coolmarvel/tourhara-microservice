import { Inject, Injectable } from '@nestjs/common';
import { IProductCategoryService } from '../interfaces/product-category.interface';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductCategoryService implements IProductCategoryService {
  constructor(@Inject('PRODUCT_SERVICE') private client: ClientProxy) {}

  // WooCommerce Staging Product Category APIs
  async createProductCategory_stag(name: string, image: any): Promise<any> {
    const pattern = { cmd: 'createProductCategory_stag' };
    const payload = { name, image };
    const category = await firstValueFrom(this.client.send(pattern, payload));

    return category;
  }

  async retrieveProductCategory_stag(category_id: string): Promise<any> {
    const pattern = { cmd: 'retrieveProductCategory_stag' };
    const payload = { category_id };
    const category = await firstValueFrom(this.client.send(pattern, payload));

    return category;
  }

  async listAllProductCategories_stag(page: number, size: number): Promise<any> {
    const pattern = { cmd: 'listAllProductCategories_stag' };
    const payload = { page, size };
    const categories = await firstValueFrom(this.client.send(pattern, payload));

    return categories;
  }

  async updateProductCategory_stag(category_id: string, data: any): Promise<any> {
    const pattern = { cmd: 'updateProductCategory_stag' };
    const payload = { category_id, data };
    const category = await firstValueFrom(this.client.send(pattern, payload));

    return category;
  }

  async deleteProductCategory_stag(category_id: string): Promise<any> {
    const pattern = { cmd: 'deleteProductCategory_stag' };
    const payload = { category_id };
    const category = await firstValueFrom(this.client.send(pattern, payload));

    return category;
  }

  // WooCommerce Production Product Category APIs
  async createProductCategory_prod(name: string, image: any): Promise<any> {
    const pattern = { cmd: 'createProductCategory_prod' };
    const payload = { name, image };
    const category = await firstValueFrom(this.client.send(pattern, payload));

    return category;
  }

  async retrieveProductCategory_prod(category_id: string): Promise<any> {
    const pattern = { cmd: 'retrieveProductCategory_prod' };
    const payload = { category_id };
    const category = await firstValueFrom(this.client.send(pattern, payload));

    return category;
  }

  async listAllProductCategories_prod(page: number, size: number): Promise<any> {
    const pattern = { cmd: 'listAllProductCategories_prod' };
    const payload = { page, size };
    const categories = await firstValueFrom(this.client.send(pattern, payload));

    return categories;
  }

  async updateProductCategory_prod(category_id: string, data: any): Promise<any> {
    const pattern = { cmd: 'updateProductCategory_prod' };
    const payload = { category_id, data };
    const category = await firstValueFrom(this.client.send(pattern, payload));

    return category;
  }

  async deleteProductCategory_prod(category_id: string): Promise<any> {
    const pattern = { cmd: 'deleteProductCategory_prod' };
    const payload = { category_id };
    const category = await firstValueFrom(this.client.send(pattern, payload));

    return category;
  }
}
