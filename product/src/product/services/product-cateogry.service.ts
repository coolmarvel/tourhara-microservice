import { Injectable } from '@nestjs/common';
import { IProductCategoryService } from '../interfaces/product-category.interface';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProductCategoryService implements IProductCategoryService {
  private wooCommerceStag: WooCommerceRestApi;
  private wooCommerceProd: WooCommerceRestApi;

  constructor(
    private dataSource: DataSource,
    private configService: ConfigService,
  ) {
    this.wooCommerceStag = new WooCommerceRestApi({
      url: this.configService.get('wc-stag.url'),
      consumerKey: this.configService.get('wc-stag.key'),
      consumerSecret: this.configService.get('wc-stag.secret'),
      version: 'wc/v3',
    });

    this.wooCommerceProd = new WooCommerceRestApi({
      url: this.configService.get('wc-prod.url'),
      consumerKey: this.configService.get('wc-prod.key'),
      consumerSecret: this.configService.get('wc-prod.secret'),
      version: 'wc/v3',
    });
  }

  // WooCommerce Staging Product Category APIs
  async createProductCategory_stag(name: string, image: any): Promise<any> {
    const data = { name, image };
    const category = await this.wooCommerceStag
      .post('products/categories', data)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return category;
  }

  async retrieveProductCategory_stag(category_id: string): Promise<any> {
    const category = await this.wooCommerceStag
      .get(`products/categories/${category_id}`)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return category;
  }

  async listAllProductCategories_stag(page: number, size: number): Promise<any> {
    const params = { page, per_page: size };
    const categories = await this.wooCommerceStag
      .get('products/categories', params)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return categories;
  }

  async updateProductCategory_stag(category_id: string, data: any): Promise<any> {
    const category = await this.wooCommerceStag
      .put(`products/categories/${category_id}`, data)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return category;
  }

  async deleteProductCategory_stag(category_id: string): Promise<any> {
    const category = await this.wooCommerceStag
      .delete(`products/categories/${category_id}`, { force: true })
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return category;
  }

  // WooCommerce Production Product Category APIs
  async createProductCategory_prod(name: string, image: any): Promise<any> {
    const data = { name, image };
    const category = await this.wooCommerceProd
      .post('products/categories', data)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return category;
  }

  async retrieveProductCategory_prod(category_id: string): Promise<any> {
    const category = await this.wooCommerceProd
      .get(`products/categories/${category_id}`)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return category;
  }

  async listAllProductCategories_prod(page: number, size: number): Promise<any> {
    const params = { page, per_page: size };
    const categories = await this.wooCommerceProd
      .get('products/categories', params)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return categories;
  }

  async updateProductCategory_prod(category_id: string, data: any): Promise<any> {
    const category = await this.wooCommerceProd
      .put(`products/categories/${category_id}`, data)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return category;
  }

  async deleteProductCategory_prod(category_id: string): Promise<any> {
    const category = await this.wooCommerceProd
      .delete(`products/categories/${category_id}`, { force: true })
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return category;
  }
}
