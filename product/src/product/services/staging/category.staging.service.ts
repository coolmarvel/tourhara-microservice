import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { ICategoryService } from 'src/product/interfaces/category.interface';
import { QueryRunner } from 'typeorm';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CategoryStagingService implements ICategoryService {
  private wooCommerce: WooCommerceRestApi;

  constructor(private configService: ConfigService) {
    this.wooCommerce = new WooCommerceRestApi({
      url: this.configService.get('wc-stag.url'),
      consumerKey: this.configService.get('wc-stag.key'),
      consumerSecret: this.configService.get('wc-stag.secret'),
      version: 'wc/v3',
    });
  }

  async createAProductCategory(data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const category = await this.wooCommerce
          .post('products/categories', data)
          .then((response: any) => response.data)
          .catch((error: any) => error.response.data);

        return resolve(category);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async retrieveAProductCategory(category_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const category = await this.wooCommerce
          .get(`products/categories/${category_id}`)
          .then((response: any) => response.data)
          .catch((error: any) => error.response.data);

        return resolve(category);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async listAllProductCategories(page: number, size: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const params = { page, per_page: size };
        const categories = await this.wooCommerce
          .get('products/categories', params)
          .then((response: any) => response.data)
          .catch((error: any) => error.response.data);

        return resolve(categories);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async updateAProductCategory(category_id: number, data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const category = await this.wooCommerce
          .put(`products/categories/${category_id}`, data)
          .then((response: any) => response.data)
          .catch((error: any) => error.response.data);

        return resolve(category);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async deleteAProductCategory(category_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const category = await this.wooCommerce
          .delete(`products/categories/${category_id}`, { force: true })
          .then((response: any) => response.data)
          .catch((error: any) => error.response.data);

        return resolve(category);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async insert(queryRunner: QueryRunner, category: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingCategory = await queryRunner.manager.query(`SELECT * FROM \`product_category\` WHERE id=?;`, [category.id]);
        if (existingCategory.length > 0) return resolve(true);

        const productCategoryId = uuid();
        await queryRunner.manager.query(
          `INSERT INTO \`product_category\` (
            product_category_id,id,parent,name,slug,description,created_at,updated_at
          ) VALUES (?,?,?,?,?,?,NOW(),NOW());`,
          [productCategoryId, category.id, category.parent, category.name, category.slug, null],
        );

        return resolve(productCategoryId);
      } catch (error) {
        console.error('Category Service Insert Error');
        console.error(error);
        return reject(error);
      }
    });
  }

  async update(queryRunner: QueryRunner, category: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingCategory = await queryRunner.manager.query(`SELECT * FROM \`product_category\` WHERE id=?;`, [category.id]);
        if (existingCategory.length === 0) return resolve(await this.insert(queryRunner, category));

        await queryRunner.manager.query(
          `UPDATE \`product_category\` SET 
            parent=?,name=?,slug=?,description=?,updated_at=NOW()
          WHERE id=?;`,
          [category.parent, category.name, category.slug, null],
        );

        return resolve(existingCategory[0].product_category_id);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async select(queryRunner: QueryRunner, id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const category = await queryRunner.manager.query(`SELECT * FROM \`product_category\` WHERE id=?;`, [id]);

        return resolve(category[0]);
      } catch (error) {
        console.error('Category Service Select Error');
        console.error(error);
        return reject(error);
      }
    });
  }
}
