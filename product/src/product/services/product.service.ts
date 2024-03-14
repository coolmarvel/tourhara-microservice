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

  // WooCommerce Staging Order APIs
  async createAnProduct_stag(name: string, type: string, regular_price: string, description: string, short_description: string, categories: object, images: object): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async retrieveAnProduct_stag(product_id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async listAllProducts_stag(page: number, size: number): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async updateAProduct_stag(product_id: string, data: any): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async deleteAProduct_stag(product_id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  // WooCommerce Production Order APIs
  async createAnProduct_prod(name: string, type: string, regular_price: string, description: string, short_description: string, categories: object, images: object): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async retrieveAnProduct_prod(product_id: string): Promise<any> {
    throw new Error('Method not implemented.');
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
    throw new Error('Method not implemented.');
  }

  async deleteAProduct_prod(product_id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
