import { Injectable } from '@nestjs/common';
import { IProductService } from '../interfaces/product.interface';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductService implements IProductService {
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

  // WooCommerce Staging Product APIs
  async createAnProduct_stag(name: string, type: string, regular_price: string, description: string, short_description: string, categories: object, images: object): Promise<any> {
    const data = { name, type, regular_price, description, short_description, categories, images };
    const product = await this.wooCommerceStag
      .post('products', data)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return product;
  }

  async retrieveAnProduct_stag(product_id: string): Promise<any> {
    const product = await this.wooCommerceStag
      .get(`products/${product_id}`)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return product;
  }

  async listAllProducts_stag(page: number, size: number): Promise<any> {
    const params = { page, per_page: size };
    const products = await this.wooCommerceStag
      .get('products', params)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return products;
  }

  async updateAProduct_stag(product_id: string, data: any): Promise<any> {
    const product = await this.wooCommerceStag
      .put(`products/${product_id}`, data)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return product;
  }

  async deleteAProduct_stag(product_id: string): Promise<any> {
    const product = await this.wooCommerceStag
      .delete(`products/${product_id}`, { force: true })
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return product;
  }

  // WooCommerce Production Product APIs
  async createAnProduct_prod(name: string, type: string, regular_price: string, description: string, short_description: string, categories: object, images: object): Promise<any> {
    const data = { name, type, regular_price, description, short_description, categories, images };
    const product = await this.wooCommerceProd
      .post('products', data)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return product;
  }

  async retrieveAnProduct_prod(product_id: string): Promise<any> {
    const product = await this.wooCommerceProd
      .get(`products/${product_id}`)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return product;
  }

  async listAllProducts_prod(page: number, size: number): Promise<any> {
    const params = { page, per_page: size };
    const products = await this.wooCommerceProd
      .get('products', params)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return products;
  }

  async updateAProduct_prod(product_id: string, data: any): Promise<any> {
    const product = await this.wooCommerceProd
      .put(`products/${product_id}`, data)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return product;
  }

  async deleteAProduct_prod(product_id: string): Promise<any> {
    const product = await this.wooCommerceProd
      .delete(`products/${product_id}`, { force: true })
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return product;
  }
}
