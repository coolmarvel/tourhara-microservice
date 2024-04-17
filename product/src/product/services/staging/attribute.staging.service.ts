import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { IAttributeService } from 'src/product/interfaces/attribute.interface';
import { DataSource, QueryRunner } from 'typeorm';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { InjectDataSource } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AttributeStagingService implements IAttributeService {
  private wooCommerce: WooCommerceRestApi;

  constructor(
    private configService: ConfigService,
    @InjectDataSource('staging') private dataSource: DataSource,
  ) {
    this.wooCommerce = new WooCommerceRestApi({
      url: this.configService.get('wc-stag.url'),
      consumerKey: this.configService.get('wc-stag.key'),
      consumerSecret: this.configService.get('wc-stag.secret'),
      version: 'wc/v3',
    });
  }

  async createAProductAttribute(data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const attribute = await this.wooCommerce
          .post('products/attributes', data)
          .then((response: any) => response.data)
          .catch((error: any) => error.response.data);

        return resolve(attribute);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async retrieveAProductAttribute(attribute_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const attribute = await this.wooCommerce
          .get(`products/attributes/${attribute_id}`)
          .then((response: any) => response.data)
          .catch((error: any) => error.response.data);

        return resolve(attribute);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async listAllProductAttributes(page: number, size: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const params = { page, per_page: size };
        const attributes = await this.wooCommerce
          .get('products/attributes', params)
          .then((response: any) => response.data)
          .catch((error: any) => error.response.data);

        return resolve(attributes);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async updateAProductAttribute(attribute_id: number, data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const attribute = await this.wooCommerce
          .put(`products/attributes/${attribute_id}`, data)
          .then((response: any) => response.data)
          .catch((error: any) => error.response.data);

        return resolve(attribute);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async deleteAProductAttribute(attribute_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const attribute = await this.wooCommerce
          .delete(`products/attributes/${attribute_id}`, { force: true })
          .then((response: any) => response.data)
          .catch((error: any) => error.response.data);

        return resolve(attribute);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async insert(queryRunner: QueryRunner, attribute: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingAttribute = await queryRunner.manager.query(`
        SELECT * FROM \`product_attribute\`
        WHERE id='${attribute.id}' AND name='${attribute.name}' AND position=${attribute.position}
        AND visible=${attribute.visible} AND options='${attribute.options}';`);
        if (existingAttribute.length > 0) return resolve(true);

        const productAttributeId = uuid();
        await queryRunner.manager.query(`
        INSERT INTO \`product_attribute\` (
          product_attribute_id, id, name, position, visible, options, created_at, updated_at
        ) VALUES (
          '${productAttributeId}',
          '${attribute.id}',
          '${attribute.name}',
          ${attribute.position},
          ${attribute.visible},
          '${attribute.options}',
          NOW(), NOW()
        );`);

        return resolve(productAttributeId);
      } catch (error) {
        console.error('Attribute Service Insert Error');
        console.error(error);
        return reject(error);
      }
    });
  }

  async select(queryRunner: QueryRunner, id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const attribute = await queryRunner.manager.query(`
        SELECT * FROM \`product_attribute\` WHERE id='${id}';`);

        return resolve(attribute[0]);
      } catch (error) {
        console.error('Attribute Service Select Error');
        console.error(error);
        return reject(error);
      }
    });
  }
}
