import { Injectable } from '@nestjs/common';
import { ICategoryService } from 'src/product/interfaces/category.interface';
import { QueryRunner } from 'typeorm';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { ConfigService } from '@nestjs/config';
import { logger } from 'src/common/logger/logger.service';

@Injectable()
export class CategoryProductionService implements ICategoryService {
  private wooCommerce: WooCommerceRestApi;

  constructor(private configService: ConfigService) {
    this.wooCommerce = new WooCommerceRestApi({
      url: this.configService.get('wc-prod.url'),
      consumerKey: this.configService.get('wc-prod.key'),
      consumerSecret: this.configService.get('wc-prod.secret'),
      version: 'wc/v3',
    });
  }

  createAProductCategory(data: any): Promise<any> {
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

  retrieveAProductCategory(category_id: number): Promise<any> {
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

  listAllProductCategories(page: number, size: number): Promise<any> {
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

  updateAProductCategory(category_id: number, data: any): Promise<any> {
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

  deleteAProductCategory(category_id: number): Promise<any> {
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

  insert(queryRunner: QueryRunner, category: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingCategory = await queryRunner.manager.query(`SELECT * FROM \`category\` WHERE id=?;`, [BigInt(category.id)]);
        if (existingCategory.length > 0) return resolve(await this.update(queryRunner, category, null));

        await queryRunner.manager.query(
          `INSERT INTO \`category\` (
            id,parent,name,slug,description,created_at,updated_at
          ) VALUES (?,?,?,?,?,NOW(),NOW());`,
          [BigInt(category.id), category.parent, category.name, category.slug, null],
        );

        return resolve(BigInt(category.id));
      } catch (error) {
        logger.error('Category Service Insert Error');
        logger.error(error);
        return reject(error);
      }
    });
  }

  update(queryRunner: QueryRunner, category: any, typeId: bigint | null): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingCategory = await queryRunner.manager.query(`SELECT * FROM \`category\` WHERE id=?;`, [BigInt(category.id)]);
        if (existingCategory.length === 0) return resolve(await this.insert(queryRunner, category));

        await queryRunner.manager.query(
          `UPDATE \`category\` SET 
            parent=?,name=?,slug=?,updated_at=NOW()
          WHERE id=?;`,
          [category.parent, category.name, category.slug, BigInt(category.id)],
        );

        return resolve(BigInt(existingCategory[0].id));
      } catch (error) {
        logger.error('Category Service Update Error');
        logger.error(error);
        return reject(error);
      }
    });
  }

  select(queryRunner: QueryRunner, id: bigint): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const category = await queryRunner.manager.query(`SELECT * FROM \`category\` WHERE id=?;`, [id]);

        return resolve(category[0]);
      } catch (error) {
        logger.error('Category Service Select Error');
        logger.error(error);
        return reject(error);
      }
    });
  }
}
