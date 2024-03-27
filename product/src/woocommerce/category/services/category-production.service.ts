import { Injectable } from '@nestjs/common';
import { ICategoryProductionService } from '../interfaces/category-production.interface';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CategoryProductionService implements ICategoryProductionService {
  private wooCommerce: WooCommerceRestApi;

  constructor(private configService: ConfigService) {
    this.wooCommerce = new WooCommerceRestApi({
      url: this.configService.get('wc-prod.url'),
      consumerKey: this.configService.get('wc-prod.key'),
      consumerSecret: this.configService.get('wc-prod.secret'),
      version: 'wc/v3',
    });
  }

  async createAProductCategory(data: any): Promise<any> {
    const category = await this.wooCommerce
      .post('products/categories', data)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return category;
  }

  async retrieveAProductCategory(category_id: number): Promise<any> {
    const category = await this.wooCommerce
      .get(`products/categories/${category_id}`)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return category;
  }

  async listAllProductCategories(page: number, size: number): Promise<any> {
    const params = { page, per_page: size };
    const categories = await this.wooCommerce
      .get('products/categories', params)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return categories;
  }

  async updateAProductCategory(category_id: number, data: any): Promise<any> {
    const category = await this.wooCommerce
      .put(`products/categories/${category_id}`, data)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return category;
  }

  async deleteAProductCategory(category_id: number): Promise<any> {
    const category = await this.wooCommerce
      .delete(`products/categories/${category_id}`, { force: true })
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return category;
  }
}
