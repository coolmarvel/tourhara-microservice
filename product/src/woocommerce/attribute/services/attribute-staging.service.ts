import { Injectable } from '@nestjs/common';

import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { ConfigService } from '@nestjs/config';
import { QueryRunner } from 'typeorm';
import { ProductAttribute } from '../entities/attribute.entity';
import { IAttributeService } from '../interfaces/attribute.interface';

@Injectable()
export class AttributeStagingService implements IAttributeService {
  private wooCommerce: WooCommerceRestApi;

  constructor(private configService: ConfigService) {
    this.wooCommerce = new WooCommerceRestApi({
      url: this.configService.get('wc-stag.url'),
      consumerKey: this.configService.get('wc-stag.key'),
      consumerSecret: this.configService.get('wc-stag.secret'),
      version: 'wc/v3',
    });
  }

  /**
   * WooCommerce
   */
  async createAProductAttribute(data: any): Promise<any> {
    const attribute = await this.wooCommerce
      .post('products/attributes', data)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return attribute;
  }

  async retrieveAProductAttribute(attribute_id: number): Promise<any> {
    const attribute = await this.wooCommerce
      .get(`products/attributes/${attribute_id}`)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return attribute;
  }

  async listAllProductAttributes(page: number, size: number): Promise<any> {
    const params = { page, per_page: size };
    const attributes = await this.wooCommerce
      .get('products/attributes', params)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return attributes;
  }

  async updateAProductAttribute(attribute_id: number, data: any): Promise<any> {
    const attribute = await this.wooCommerce
      .put(`products/attributes/${attribute_id}`, data)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return attribute;
  }

  async deleteAProductAttribute(attribute_id: number): Promise<any> {
    const attribute = await this.wooCommerce
      .delete(`products/attributes/${attribute_id}`, { force: true })
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return attribute;
  }

  /**
   * Synchronize
   */
  async insert(queryRunner: QueryRunner, attribute: any): Promise<any> {
    try {
      const existing = await queryRunner.manager.findOne(ProductAttribute, {
        where: {
          id: attribute.id,
          name: attribute.name,
          position: attribute.position,
          visible: attribute.visible,
          options: attribute.options,
        },
      });
      if (existing) return false;

      const newAttribute = {
        id: attribute.id,
        name: attribute.name,
        position: attribute.position,
        visible: attribute.visible,
        options: attribute.options,
      };
      const attributeEntity = queryRunner.manager.create(ProductAttribute, newAttribute);
      const productAttribute = await queryRunner.manager.save(attributeEntity);

      return productAttribute;
    } catch (error) {
      throw error;
    }
  }

  async update(queryRunner: QueryRunner, attribute: any): Promise<any> {
    try {
      const existing = await queryRunner.manager.findOne(ProductAttribute, {
        where: {
          id: attribute.id,
          name: attribute.name,
          position: attribute.position,
          visible: attribute.visible,
          options: attribute.options,
        },
      });
      if (existing) {
        const updateAttribute: Partial<ProductAttribute> = {
          id: attribute.id,
          name: attribute.name,
          position: attribute.position,
          visible: attribute.visible,
          options: attribute.options,
        };
        await queryRunner.manager.update(ProductAttribute, { id: attribute.id }, updateAttribute);

        return true;
      } else if (!existing) await this.insert(queryRunner, attribute);
    } catch (error) {
      throw error;
    }
  }

  async selectAll(queryRunner: QueryRunner, attribute: any): Promise<any> {
    try {
    } catch (error) {
      throw error;
    }
  }

  async select(queryRunner: QueryRunner, attribute_id: any): Promise<any> {
    try {
      const productAttribute = await queryRunner.manager.findOne(ProductAttribute, { where: { id: attribute_id } });

      return productAttribute;
    } catch (error) {
      throw error;
    }
  }

  async delete(queryRunner: QueryRunner, attribute: any): Promise<any> {
    try {
    } catch (error) {
      throw error;
    }
  }
}
