import { Injectable } from '@nestjs/common';
import { IAttributeService } from '../interfaces/attribute.interface';

import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { ProductAttribute } from '../entities/attribute.entity';

@Injectable()
export class AttributeService implements IAttributeService {
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

  // WooCommerce Staging Product Attribute APIs
  async createAProductAttribute_stag(data: any): Promise<any> {
    const attribute = await this.wooCommerceStag
      .post('products/attributes', data)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return attribute;
  }

  async retrieveAProductAttribute_stag(attribute_id: string): Promise<any> {
    const attribute = await this.wooCommerceStag
      .get(`products/attributes/${attribute_id}`)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return attribute;
  }
  async listAllProductAttributes_stag(page: number, size: number): Promise<any> {
    const params = { page, per_page: size };
    const attributes = await this.wooCommerceStag
      .get('products/attributes', params)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return attributes;
  }

  async updateAProductAttribute_stag(attribute_id: string, data: any): Promise<any> {
    const attribute = await this.wooCommerceStag
      .put(`products/attributes/${attribute_id}`, data)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return attribute;
  }

  async deleteAProductAttribute_stag(attribute_id: string): Promise<any> {
    const attribute = await this.wooCommerceStag
      .delete(`products/attributes/${attribute_id}`, { force: true })
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return attribute;
  }

  // WooCommerce Staging Product Attribute APIs
  async createAProductAttribute_prod(data: any): Promise<any> {
    const attribute = await this.wooCommerceProd
      .post('products/attributes', data)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return attribute;
  }

  async retrieveAProductAttribute_prod(attribute_id: string): Promise<any> {
    const attribute = await this.wooCommerceProd
      .get(`products/attributes/${attribute_id}`)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return attribute;
  }

  async listAllProductAttributes_prod(page: number, size: number): Promise<any> {
    const params = { page, per_page: size };
    const attributes = await this.wooCommerceProd
      .get('products/attributes', params)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return attributes;
  }

  async updateAProductAttribute_prod(attribute_id: string, data: any): Promise<any> {
    const attribute = await this.wooCommerceProd
      .put(`products/attributes/${attribute_id}`, data)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return attribute;
  }

  async deleteAProductAttribute_prod(attribute_id: string): Promise<any> {
    const attribute = await this.wooCommerceProd
      .delete(`products/attributes/${attribute_id}`, { force: true })
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return attribute;
  }

  async insertProductAttribute_stag(): Promise<any> {}

  async insertProductAttribute_prod(): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      for (let i = 1; i < Infinity; i++) {
        console.log(`product attribute migrate (page: ${i})`);
        const params = { page: i, per_page: 10 };
        const products = await this.wooCommerceProd
          .get('products', params)
          .then((response: any) => response.data)
          .catch((error: any) => error.response.data);

        if (products.length === 0) break;
        for (const product of products) {
          const attributes = product.attributes;
          for (const attribute of attributes) {
            const existingProductAttribute = await queryRunner.manager.findOne(ProductAttribute, {
              where: {
                id: attribute.id,
                name: attribute.name,
                position: attribute.position,
                visible: attribute.visible,
                variation: attribute.variation,
                options: attribute.options,
              },
            });
            if (existingProductAttribute) continue;

            const newProductAttribute = {
              id: attribute.id,
              name: attribute.name,
              position: attribute.position,
              visible: attribute.visible,
              variation: attribute.variation,
              options: attribute.options,
            };
            const productAttributeEntity = queryRunner.manager.create(ProductAttribute, newProductAttribute);
            await queryRunner.manager.save(productAttributeEntity);
          }
        }
      }

      await queryRunner.commitTransaction();

      return 'insertProductAttribute_prod success';
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
