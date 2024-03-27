import { Injectable } from '@nestjs/common';
import { ITagProductionService } from '../interfaces/tag-production.interface';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TagProductionService implements ITagProductionService {
  private wooCommerce: WooCommerceRestApi;

  constructor(private configService: ConfigService) {
    this.wooCommerce = new WooCommerceRestApi({
      url: this.configService.get('wc-prod.url'),
      consumerKey: this.configService.get('wc-prod.key'),
      consumerSecret: this.configService.get('wc-prod.secret'),
      version: 'wc/v3',
    });
  }

  async createAProductTag(data: any): Promise<any> {
    const tag = await this.wooCommerce
      .post('products/tags', data)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return tag;
  }

  async retrieveAProductTag(tag_id: number): Promise<any> {
    const tag = await this.wooCommerce
      .get(`products/tags/${tag_id}`)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return tag;
  }

  async listAllProductTags(page: number, size: number): Promise<any> {
    const params = { page, per_page: size };
    const tags = await this.wooCommerce
      .get('products/tags', params)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return tags;
  }

  async updateAProductTag(tag_id: number, data: any): Promise<any> {
    const tag = await this.wooCommerce
      .put(`products/tags/${tag_id}`, data)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return tag;
  }

  async deleteAProductTag(tag_id: number): Promise<any> {
    const tag = await this.wooCommerce
      .delete(`products/tags/${tag_id}`, { force: true })
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return tag;
  }
}
