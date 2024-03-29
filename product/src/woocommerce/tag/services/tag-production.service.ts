import { Injectable } from '@nestjs/common';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { ConfigService } from '@nestjs/config';
import { DataSource, QueryRunner } from 'typeorm';
import { ProductTag } from '../entities/tag.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { ITagService } from '../interfaces/tag.interface';

@Injectable()
export class TagProductionService implements ITagService {
  private wooCommerce: WooCommerceRestApi;

  constructor(
    private configService: ConfigService,
    @InjectDataSource('production') private dataSource: DataSource,
  ) {
    this.wooCommerce = new WooCommerceRestApi({
      url: this.configService.get('wc-prod.url'),
      consumerKey: this.configService.get('wc-prod.key'),
      consumerSecret: this.configService.get('wc-prod.secret'),
      version: 'wc/v3',
    });
  }

  /**
   * WooCommerce
   */
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

  /**
   * Synchronize
   */
  async insert(queryRunner: QueryRunner, tag: any): Promise<any> {
    try {
      const existingProductTag = await queryRunner.manager.findOne(ProductTag, { where: { id: tag.id } });
      if (existingProductTag) return false;

      const newProductTag = {
        id: tag.id,
        name: tag.name === '' ? null : tag.name,
        slug: tag.slug === '' ? null : tag.slug,
        count: tag.count,
      };
      const productTagEntity = queryRunner.manager.create(ProductTag, newProductTag);
      const productTag = await queryRunner.manager.save(productTagEntity);

      return true;
    } catch (error) {
      throw error;
    }
  }

  async update(queryRunner: QueryRunner, tag: any): Promise<any> {
    try {
      const existingProductTag = await queryRunner.manager.findOne(ProductTag, { where: { id: tag.id } });
      if (!existingProductTag) return await this.insert(queryRunner, tag);

      const updateProductTag: Partial<ProductTag> = {
        name: tag.name === '' ? null : tag.name,
        slug: tag.slug === '' ? null : tag.slug,
        count: tag.count,
      };
      await queryRunner.manager.update(ProductTag, { id: tag.id }, updateProductTag);

      return true;
    } catch (error) {
      throw error;
    }
  }

  async selectAll(queryRunner: QueryRunner, tag: any): Promise<any> {
    try {
    } catch (error) {
      throw error;
    }
  }

  async select(queryRunner: QueryRunner, tag_id: any): Promise<any> {
    try {
      const productTag = await queryRunner.manager.findOne(ProductTag, { where: { id: tag_id } });

      return productTag;
    } catch (error) {
      throw error;
    }
  }

  async delete(queryRunner: QueryRunner, tag: any): Promise<any> {
    try {
      const existingProductTag = await queryRunner.manager.findOne(ProductTag, { where: { id: tag.id } });
      if (!existingProductTag) return true;

      await queryRunner.manager.delete(ProductTag, existingProductTag.productTagId);
    } catch (error) {
      throw error;
    }
  }
}
