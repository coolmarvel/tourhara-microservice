import { Injectable } from '@nestjs/common';
import { ITagService } from 'src/product/interfaces/tag.interface';
import { QueryRunner } from 'typeorm';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { ConfigService } from '@nestjs/config';
import { logger } from 'src/common/logger/logger.service';

@Injectable()
export class TagService implements ITagService {
  private wooCommerce: WooCommerceRestApi;

  constructor(private configService: ConfigService) {
    this.wooCommerce = new WooCommerceRestApi({
      url: this.configService.get('wc.url'),
      consumerKey: this.configService.get('wc.key'),
      consumerSecret: this.configService.get('wc.secret'),
      version: 'wc/v3',
    });
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

  async insert(queryRunner: QueryRunner, tag: any): Promise<any> {
    try {
      const existingTag = await queryRunner.manager.query(`SELECT * FROM \`tag\` WHERE id=?;`, [BigInt(tag.id)]);
      if (existingTag.length > 0) return await this.update(queryRunner, tag);

      await queryRunner.manager.query(
        `INSERT INTO \`tag\` (
            id,name,slug,count,created_at,updated_at
          ) VALUES (?,?,?,?,NOW(),NOW());`,
        [BigInt(tag.id), tag.name === '' ? null : tag.name, tag.slug === '' ? null : tag.slug, tag.count],
      );

      return BigInt(tag.id);
    } catch (error) {
      logger.error('Tag Service Insert Error');
      logger.error(error);
      throw error;
    }
  }

  async update(queryRunner: QueryRunner, tag: any): Promise<any> {
    try {
      const existingTag = await queryRunner.manager.query(`SELECT * FROM \`tag\` WHERE id=?;`, [BigInt(tag.id)]);
      if (existingTag.length === 0) return await this.insert(queryRunner, tag);

      await queryRunner.manager.query(
        `UPDATE \`tag\` SET 
            name=?,slug=?,count=?,updated_at=NOW()
          WHERE id=?;`,
        [tag.name === '' ? null : tag.name, tag.slug === '' ? null : tag.slug, tag.count, BigInt(tag.id)],
      );

      return BigInt(existingTag[0].id);
    } catch (error) {
      logger.error('Tag Service Update Error');
      logger.error(error);
      throw error;
    }
  }

  async select(queryRunner: QueryRunner, id: bigint): Promise<any> {
    try {
      const tag = await queryRunner.manager.query(`SELECT * FROM \`tag\` WHERE id=?;`, [id]);

      return tag[0];
    } catch (error) {
      logger.error('Tag Service Select Error');
      logger.error(error);
      throw error;
    }
  }
}
