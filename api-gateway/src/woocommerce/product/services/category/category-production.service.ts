import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ICategoryProductionService } from 'src/woocommerce/product/interfaces/category/category-production.interface';

@Injectable()
export class CategoryProductionService implements ICategoryProductionService {
  constructor(@Inject('PRODUCT_SERVICE') private client: ClientProxy) {}

  async createAProductCategory(data: any): Promise<any> {
    const pattern = { cmd: 'createAProductCategory_woocommerce_production' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async retrieveAProductCategory(category_id: number): Promise<any> {
    const pattern = { cmd: 'retrieveAProductCategory_woocommerce_production' };
    const payload = { category_id };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async listAllProductCategories(page: number, size: number): Promise<any> {
    const pattern = { cmd: 'listAllProductCategories_woocommerce_production' };
    const payload = { page, size };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async updateAProductCategory(category_id: number, data: any): Promise<any> {
    const pattern = { cmd: 'updateAProductCategory_woocommerce_production' };
    const payload = { category_id, data };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async deleteAProductCategory(category_id: number): Promise<any> {
    const pattern = { cmd: 'deleteAProductCategory_woocommerce_production' };
    const payload = { category_id };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }
}
