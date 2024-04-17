import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { ITagService } from 'src/product/interfaces/tag.interface';
import { QueryRunner } from 'typeorm';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TagStagingService implements ITagService {
  private wooCommerce: WooCommerceRestApi;

  constructor(private configService: ConfigService) {
    this.wooCommerce = new WooCommerceRestApi({
      url: this.configService.get('wc-stag.url'),
      consumerKey: this.configService.get('wc-stag.key'),
      consumerSecret: this.configService.get('wc-stag.secret'),
      version: 'wc/v3',
    });
  }

  async createAProductTag(data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const tag = await this.wooCommerce
          .post('products/tags', data)
          .then((response: any) => response.data)
          .catch((error: any) => error.response.data);

        return resolve(tag);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async retrieveAProductTag(tag_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const tag = await this.wooCommerce
          .get(`products/tags/${tag_id}`)
          .then((response: any) => response.data)
          .catch((error: any) => error.response.data);

        return resolve(tag);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async listAllProductTags(page: number, size: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const params = { page, per_page: size };
        const tags = await this.wooCommerce
          .get('products/tags', params)
          .then((response: any) => response.data)
          .catch((error: any) => error.response.data);

        return resolve(tags);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async updateAProductTag(tag_id: number, data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const tag = await this.wooCommerce
          .put(`products/tags/${tag_id}`, data)
          .then((response: any) => response.data)
          .catch((error: any) => error.response.data);

        return resolve(tag);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async deleteAProductTag(tag_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const tag = await this.wooCommerce
          .delete(`products/tags/${tag_id}`, { force: true })
          .then((response: any) => response.data)
          .catch((error: any) => error.response.data);

        return resolve(tag);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async insert(queryRunnery: QueryRunner, tag: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingTag = await queryRunnery.manager.query(`
        SELECT id FROM \`product_tag\` WHERE id='${tag.id}'`);
        if (existingTag.length > 0) return resolve(true);

        const productTagId = uuid();
        await queryRunnery.manager.query(`
        INSERT INTO \`product_tag\` (
          product_tag_id, id, name, slug, count, created_at, updated_at
        ) VALUES (
          '${productTagId}',
          '${tag.id}',
          ${tag.name === '' ? null : `'${tag.name}'`},
          ${tag.slug === '' ? null : `'${tag.slug}'`},
          '${tag.count}',
          NOW(), NOW()
        );`);

        return resolve(productTagId);
      } catch (error) {
        console.error('Tag Service Insert Error');
        console.error(error);
        return reject(error);
      }
    });
  }

  async select(queryRunner: QueryRunner, id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const tag = await queryRunner.manager.query(`
        SELECT * FROM \`product_tag\` WHERE id='${id}';`);

        return resolve(tag[0]);
      } catch (error) {
        console.error('Tag Service Select Error');
        console.error(error);
        return reject(error);
      }
    });
  }
}
