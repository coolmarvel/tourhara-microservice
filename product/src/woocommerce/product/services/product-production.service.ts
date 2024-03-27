import { Injectable } from '@nestjs/common';
import { IProductProductionService } from '../interfaces/product-production.interface';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProductProductionService implements IProductProductionService {
  private wooCommerce: WooCommerceRestApi;

  constructor(private configService: ConfigService) {
    this.wooCommerce = new WooCommerceRestApi({
      url: this.configService.get('wc-prod.url'),
      consumerKey: this.configService.get('wc-prod.key'),
      consumerSecret: this.configService.get('wc-prod.secret'),
      version: 'wc/v3',
    });
  }

  async createAProduct(data: any): Promise<any> {
    const product = await this.wooCommerce
      .post('products', data)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return product;
  }

  async retrieveAProduct(product_id: number): Promise<any> {
    const product = await this.wooCommerce
      .get(`products/${product_id}`)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return product;
  }

  async listAllProducts(page: number, size: number): Promise<any> {
    const params = { page, per_page: size };
    const products = await this.wooCommerce
      .get('products', params)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return products;
  }

  async updateAProduct(product_id: number, data: any): Promise<any> {
    const product = await this.wooCommerce
      .put(`products/${product_id}`, data)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return product;
  }

  async deleteAProduct(product_id: number): Promise<any> {
    const product = await this.wooCommerce
      .delete(`products/${product_id}`, { force: true })
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return product;
  }
}
