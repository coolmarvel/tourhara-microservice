import { Injectable } from '@nestjs/common';
import { ITagService } from '../interfaces/tag.interface';

import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { DataSource, QueryRunner } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { ProductTag } from '../entities/tag.entity';

@Injectable()
export class TagService implements ITagService {
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

  // WooCommerce Staging Product Tags APIs
  async createAProductTag_stag(data: any): Promise<any> {
    const tag = await this.wooCommerceStag
      .post('products/tags', data)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return tag;
  }

  async retrieveAProductTag_stag(tag_id: string): Promise<any> {
    const tag = await this.wooCommerceStag
      .get(`products/tags/${tag_id}`)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return tag;
  }

  async listAllProductTags_stag(page: number, size: number): Promise<any> {
    const params = { page, per_page: size };
    const tags = await this.wooCommerceStag
      .get('products/tags', params)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return tags;
  }

  async updateAProductTag_stag(tag_id: string, data: any): Promise<any> {
    const tag = await this.wooCommerceStag
      .put(`products/tags/${tag_id}`, data)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return tag;
  }

  async deleteAProductTag_stag(tag_id: string): Promise<any> {
    const tag = await this.wooCommerceStag
      .delete(`products/tags/${tag_id}`, { force: true })
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return tag;
  }

  // WooCommerce Production Product Tags APIs
  async createAProductTag_prod(data: any): Promise<any> {
    const tag = await this.wooCommerceProd
      .post('products/tags', data)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return tag;
  }

  async retrieveAProductTag_prod(tag_id: string): Promise<any> {
    const tag = await this.wooCommerceProd
      .get(`products/tags/${tag_id}`)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return tag;
  }

  async listAllProductTags_prod(page: number, size: number): Promise<any> {
    const params = { page, per_page: size };
    const tags = await this.wooCommerceProd
      .get('products/tags', params)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return tags;
  }

  async updateAProductTag_prod(tag_id: string, data: any): Promise<any> {
    const tag = await this.wooCommerceProd
      .put(`products/tags/${tag_id}`, data)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return tag;
  }

  async deleteAProductTag_prod(tag_id: string): Promise<any> {
    const tag = await this.wooCommerceProd
      .delete(`products/tags/${tag_id}`, { force: true })
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return tag;
  }

  async insertProductTag_stag(): Promise<any> {}

  async insertProductTag_prod(): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      for (let i = 1; i < 9999; i++) {
        console.log(`product tag migrate (page: ${i})`);
        const params = { page: i, per_page: 10 };
        const tags = await this.wooCommerceProd
          .get('products/tags', params)
          .then((response: any) => response.data)
          .catch((error: any) => error.response.data);

        if (tags.length === 0) break;

        for (const tag of tags) {
          const existingTag = await queryRunner.manager.findOne(ProductTag, { where: { id: tag.id } });
          if (existingTag) continue;

          const newProductTag = {
            id: tag.id,
            name: tag.name,
            slug: tag.slug,
            count: tag.count,
          };
          const productTagEntity = queryRunner.manager.create(ProductTag, newProductTag);
          await queryRunner.manager.save(productTagEntity);
        }
      }

      await queryRunner.commitTransaction();

      return 'insertProductTag_prod success';
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async saveProductTag_stag(queryRunner: QueryRunner, tag: any): Promise<any> {
    try {
      await queryRunner.startTransaction();

      const existingProductTag = await queryRunner.manager.findOne(ProductTag, { where: { id: tag.id } });
      if (existingProductTag) return true;

      const newProductTag = {
        id: tag.id,
        name: tag.name,
        slug: tag.slug,
        count: tag.count,
      };
      const prodctTagEntity = queryRunner.manager.create(ProductTag, newProductTag);
      await queryRunner.manager.save(prodctTagEntity);

      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }

  async saveProductTag_prod(queryRunner: QueryRunner, tag: any): Promise<any> {
    try {
      await queryRunner.startTransaction();

      const existingProductTag = await queryRunner.manager.findOne(ProductTag, { where: { id: tag.id } });
      if (existingProductTag) return true;

      const newProductTag = {
        id: tag.id,
        name: tag.name,
        slug: tag.slug,
        count: tag.count,
      };
      const prodctTagEntity = queryRunner.manager.create(ProductTag, newProductTag);
      await queryRunner.manager.save(prodctTagEntity);

      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }
}
