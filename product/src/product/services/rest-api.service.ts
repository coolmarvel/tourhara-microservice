import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

import { IRestApiService } from '../interfaces';

@Injectable()
export default class RestApiService implements IRestApiService {
  private wooCommerce: WooCommerceRestApi;

  constructor(private configService: ConfigService) {
    this.wooCommerce = new WooCommerceRestApi({
      url: this.configService.get('wc.url'),
      consumerKey: this.configService.get('wc.key'),
      consumerSecret: this.configService.get('wc.secret'),
      version: 'wc/v3',
    });
  }

  async createAProductAttribute(data: any): Promise<any> {
    try {
      return await this.wooCommerce
        .post('products/attributes', data)
        .then((response: any) => response.data)
        .catch((error: any) => error.response.data);
    } catch (error) {
      throw error;
    }
  }

  async retrieveAProductAttribute(attribute_id: number): Promise<any> {
    try {
      return await this.wooCommerce
        .get(`products/attributes/${attribute_id}`)
        .then((response: any) => response.data)
        .catch((error: any) => error.response.data);
    } catch (error) {
      throw error;
    }
  }

  async listAllProductAttributes(page: number, size: number): Promise<any> {
    try {
      const params = { page, per_page: size };
      return await this.wooCommerce
        .get('products/attributes', params)
        .then((response: any) => response.data)
        .catch((error: any) => error.response.data);
    } catch (error) {
      throw error;
    }
  }

  async updateAProductAttribute(attribute_id: number, data: any): Promise<any> {
    try {
      return await this.wooCommerce
        .put(`products/attributes/${attribute_id}`, data)
        .then((response: any) => response.data)
        .catch((error: any) => error.response.data);
    } catch (error) {
      throw error;
    }
  }

  async deleteAProductAttribute(attribute_id: number): Promise<any> {
    try {
      return await this.wooCommerce
        .delete(`products/attributes/${attribute_id}`, { force: true })
        .then((response: any) => response.data)
        .catch((error: any) => error.response.data);
    } catch (error) {
      throw error;
    }
  }

  async createAProductTag(data: any): Promise<any> {
    try {
      return await this.wooCommerce
        .post('products/tags', data)
        .then((response: any) => response.data)
        .catch((error: any) => error.response.data);
    } catch (error) {
      throw error;
    }
  }

  async retrieveAProductTag(tag_id: number): Promise<any> {
    try {
      return await this.wooCommerce
        .get(`products/tags/${tag_id}`)
        .then((response: any) => response.data)
        .catch((error: any) => error.response.data);
    } catch (error) {
      throw error;
    }
  }

  async listAllProductTags(page: number, size: number): Promise<any> {
    try {
      return await this.wooCommerce
        .get('products/tags', { page, per_page: size })
        .then((response: any) => response.data)
        .catch((error: any) => error.response.data);
    } catch (error) {
      throw error;
    }
  }

  async updateAProductTag(tag_id: number, data: any): Promise<any> {
    try {
      return await this.wooCommerce
        .put(`products/tags/${tag_id}`, data)
        .then((response: any) => response.data)
        .catch((error: any) => error.response.data);
    } catch (error) {
      throw error;
    }
  }

  async deleteAProductTag(tag_id: number): Promise<any> {
    try {
      return await this.wooCommerce
        .delete(`products/tags/${tag_id}`, { force: true })
        .then((response: any) => response.data)
        .catch((error: any) => error.response.data);
    } catch (error) {
      throw error;
    }
  }

  async createAProductCategory(data: any): Promise<any> {
    try {
      return await this.wooCommerce
        .post('products/categories', data)
        .then((response: any) => response.data)
        .catch((error: any) => error.response.data);
    } catch (error) {
      throw error;
    }
  }

  async retrieveAProductCategory(category_id: number): Promise<any> {
    try {
      return await this.wooCommerce
        .get(`products/categories/${category_id}`)
        .then((response: any) => response.data)
        .catch((error: any) => error.response.data);
    } catch (error) {
      throw error;
    }
  }

  async listAllProductCategories(page: number, size: number): Promise<any> {
    try {
      return await this.wooCommerce
        .get('products/categories', { page, per_page: size })
        .then((response: any) => response.data)
        .catch((error: any) => error.response.data);
    } catch (error) {
      throw error;
    }
  }

  async updateAProductCategory(category_id: number, data: any): Promise<any> {
    try {
      return await this.wooCommerce
        .put(`products/categories/${category_id}`, data)
        .then((response: any) => response.data)
        .catch((error: any) => error.response.data);
    } catch (error) {
      throw error;
    }
  }

  async deleteAProductCategory(category_id: number): Promise<any> {
    try {
      return await this.wooCommerce
        .delete(`products/categories/${category_id}`, { force: true })
        .then((response: any) => response.data)
        .catch((error: any) => error.response.data);
    } catch (error) {
      throw error;
    }
  }

  async createAProduct(data: any): Promise<any> {
    try {
      return await this.wooCommerce
        .post('products', data)
        .then((response: any) => response.data)
        .catch((error: any) => error.response.data);
    } catch (error) {
      throw error;
    }
  }

  async retrieveAProduct(product_id: number): Promise<any> {
    try {
      return await this.wooCommerce
        .get(`products/${product_id}`)
        .then((response: any) => response.data)
        .catch((error: any) => error.response.data);
    } catch (error) {
      throw error;
    }
  }

  async listAllProducts(page: number, size: number): Promise<any> {
    try {
      const params = { page, per_page: size };

      return await this.wooCommerce
        .get('products', params)
        .then((response: any) => response.data)
        .catch((error: any) => error.response.data);
    } catch (error) {
      throw error;
    }
  }

  async updateAProduct(product_id: number, data: any): Promise<any> {
    try {
      return await this.wooCommerce
        .put(`products/${product_id}`, data)
        .then((response: any) => response.data)
        .catch((error: any) => error.response.data);
    } catch (error) {
      throw error;
    }
  }

  async deleteAProduct(product_id: number): Promise<any> {
    try {
      return await this.wooCommerce
        .delete(`products/${product_id}`, { force: true })
        .then((response: any) => response.data)
        .catch((error: any) => error.response.data);
    } catch (error) {
      throw error;
    }
  }
}
