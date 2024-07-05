import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';

import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

import { ICategoryService } from 'src/product/interfaces/category.interface';
import { logger } from 'src/common/logger/logger.service';

@Injectable()
export class CategoryService implements ICategoryService {
  private wooCommerce: WooCommerceRestApi;

  constructor(private configService: ConfigService) {
    this.wooCommerce = new WooCommerceRestApi({
      url: this.configService.get('wc.url'),
      consumerKey: this.configService.get('wc.key'),
      consumerSecret: this.configService.get('wc.secret'),
      version: 'wc/v3',
    });
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

  async insert(queryRunner: QueryRunner, category: any): Promise<any> {
    try {
      const existingCategory = await queryRunner.manager.query(`SELECT * FROM \`category\` WHERE id=?;`, [BigInt(category.id)]);
      if (existingCategory.length > 0) return await this.update(queryRunner, category);

      await queryRunner.manager.query(
        `INSERT INTO \`category\` (
            id,parent,name,slug,description,created_at,updated_at
          ) VALUES (?,?,?,?,?,NOW(),NOW());`,
        [BigInt(category.id), category.parent, category.name, category.slug, null],
      );

      return BigInt(category.id);
    } catch (error) {
      logger.error('Category Service Insert Error');
      logger.error(error);
      throw error;
    }
  }

  async update(queryRunner: QueryRunner, category: any): Promise<any> {
    try {
      const existingCategory = await queryRunner.manager.query(`SELECT * FROM \`category\` WHERE id=?;`, [BigInt(category.id)]);
      if (existingCategory.length === 0) return await this.insert(queryRunner, category);

      await queryRunner.manager.query(
        `UPDATE \`category\` SET 
            parent=?,name=?,slug=?,updated_at=NOW()
          WHERE id=?;`,
        [category.parent, category.name, category.slug, BigInt(category.id)],
      );

      return BigInt(existingCategory[0].id);
    } catch (error) {
      logger.error('Category Service Update Error');
      logger.error(error);
      throw error;
    }
  }

  async select(queryRunner: QueryRunner, id: bigint): Promise<any> {
    try {
      const category = await queryRunner.manager.query(`SELECT * FROM \`category\` WHERE id=?;`, [id]);

      return category[0];
    } catch (error) {
      logger.error('Category Service Select Error');
      logger.error(error);
      throw error;
    }
  }
}
