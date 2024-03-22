import { Inject, Injectable } from '@nestjs/common';
import { IProductCategoryService } from '../../interfaces/category/product-category.interface';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductCategoryService implements IProductCategoryService {
  constructor(@Inject('PRODUCT_SERVICE') private client: ClientProxy) {}

  // WooCommerce Staging Product Category APIs
  async createAProductCategory_stag(name: string, image: any): Promise<any> {
    const pattern = { cmd: 'createAProductCategory_stag' };
    const payload = { name, image };
    const category = await firstValueFrom(this.client.send(pattern, payload));

    return category;
  }

  async retrieveAProductCategory_stag(category_id: string): Promise<any> {
    const pattern = { cmd: 'retrieveAProductCategory_stag' };
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

  async updateAProductCategory_stag(category_id: string, data: any): Promise<any> {
    const pattern = { cmd: 'updateAProductCategory_stag' };
    const payload = { category_id, data };
    const category = await firstValueFrom(this.client.send(pattern, payload));

    return category;
  }

  async deleteAProductCategory_stag(category_id: string): Promise<any> {
    const pattern = { cmd: 'deleteAProductCategory_stag' };
    const payload = { category_id };
    const category = await firstValueFrom(this.client.send(pattern, payload));

    return category;
  }

  // WooCommerce Production Product Category APIs
  async createAProductCategory_prod(name: string, image: any): Promise<any> {
    const pattern = { cmd: 'createAProductCategory_prod' };
    const payload = { name, image };
    const category = await firstValueFrom(this.client.send(pattern, payload));

    return category;
  }

  async retrieveAProductCategory_prod(category_id: string): Promise<any> {
    const pattern = { cmd: 'retrieveAProductCategory_prod' };
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

  async updateAProductCategory_prod(category_id: string, data: any): Promise<any> {
    const pattern = { cmd: 'updateAProductCategory_prod' };
    const payload = { category_id, data };
    const category = await firstValueFrom(this.client.send(pattern, payload));

    return category;
  }

  async deleteAProductCategory_prod(category_id: string): Promise<any> {
    const pattern = { cmd: 'deleteAProductCategory_prod' };
    const payload = { category_id };
    const category = await firstValueFrom(this.client.send(pattern, payload));

    return category;
  }

  // Database insert
  async insertProductCategories_prod() {
    const pattern = { cmd: 'insertProductCategories_prod' };
    const payload = {};
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }
}
