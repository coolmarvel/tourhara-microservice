import { Injectable } from '@nestjs/common';
import { IAttributeProductionService } from '../interfaces/attribute-production.interface';

import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { ConfigService } from '@nestjs/config';
import { QueryRunner } from 'typeorm';
import { ProductAttribute } from '../entities/attribute.entity';

@Injectable()
export class AttributeProductionService implements IAttributeProductionService {
  private wooCommerce: WooCommerceRestApi;

  constructor(private configService: ConfigService) {
    this.wooCommerce = new WooCommerceRestApi({
      url: this.configService.get('wc-prod.url'),
      consumerKey: this.configService.get('wc-prod.key'),
      consumerSecret: this.configService.get('wc-prod.secret'),
      version: 'wc/v3',
    });
  }

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

  async insertAttribute(queryRunner: QueryRunner, attribute: any): Promise<any> {
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
      else {
        const newAttribute = {
          id: attribute.id,
          name: attribute.name,
          position: attribute.position,
          visible: attribute.visible,
          options: attribute.options,
        };
        const attributeEntity = queryRunner.manager.create(ProductAttribute, newAttribute);
        await queryRunner.manager.save(attributeEntity);

        return true;
      }
    } catch (error) {
      throw error;
    }
  }

  async updateAttribute(queryRunner: QueryRunner, attribute: any): Promise<any> {
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
      } else if (!existing) await this.insertAttribute(queryRunner, attribute);
    } catch (error) {
      throw error;
    }
  }

  async selectAttribute(queryRunner: QueryRunner, page: number, size: number): Promise<any> {
    try {
      return await queryRunner.manager.find(ProductAttribute, { skip: (page - 1) * size, take: size });
    } catch (error) {
      throw error;
    }
  }

  async selectAttributeById(queryRunner: QueryRunner, attribute_id: number): Promise<any> {
    try {
      return await queryRunner.manager.findOne(ProductAttribute, { where: { id: attribute_id } });
    } catch (error) {
      throw error;
    }
  }

  async deleteAttribute(queryRunner: QueryRunner, attribute_id: number): Promise<any> {
    try {
      const existing = await queryRunner.manager.findOne(ProductAttribute, { where: { id: attribute_id } });
      if (existing) {
        await queryRunner.manager.delete(ProductAttribute, { where: { id: attribute_id } });

        return true;
      } else if (!existing) false;
    } catch (error) {
      throw error;
    }
  }
}
