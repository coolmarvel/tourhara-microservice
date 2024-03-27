import { Injectable } from '@nestjs/common';
import { IProductProductionService } from '../interfaces/product-production.interface';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { ConfigService } from '@nestjs/config';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CategoryProductionService } from 'src/woocommerce/category/services/category-production.service';
import { TagProductionService } from 'src/woocommerce/tag/services/tag-production.service';
import { AttributeProductionService } from 'src/woocommerce/attribute/services/attribute-production.service';

@Injectable()
export class ProductProductionService implements IProductProductionService {
  constructor(
    private configService: ConfigService,
    private wooCommerce: WooCommerceRestApi,
    private tagProductionService: TagProductionService,
    private categoryProductionService: CategoryProductionService,
    private attributeProductionService: AttributeProductionService,
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
   * WooCommerce REST API
   */
  async createAProduct(data: any): Promise<any> {
    const product = await this.wooCommerce
      .post('products', data)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return product;
  }

  async retrieveAProduct(product_id: number): Promise<any> {
    const product = await this.wooCommerce
      .get(`products/${product_id}`)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return product;
  }

  async listAllProducts(page: number, size: number): Promise<any> {
    const params = { page, per_page: size };
    const products = await this.wooCommerce
      .get('products', params)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return products;
  }

  async updateAProduct(product_id: number, data: any): Promise<any> {
    const product = await this.wooCommerce
      .put(`products/${product_id}`, data)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return product;
  }

  async deleteAProduct(product_id: number): Promise<any> {
    const product = await this.wooCommerce
      .delete(`products/${product_id}`, { force: true })
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return product;
  }

  /**
   * Synchoronize WooCommerce to Database
   */
  async synchronizeProductByWooCommerce(): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    let categoriesFlag: boolean = true;
    let productsFlag: boolean = true;
    let tagsFlag: boolean = true;

    try {
      for (let i = 1; i < Infinity; i++) {
        if (categoriesFlag === false && productsFlag === false && tagsFlag === false) break;

        await queryRunner.startTransaction();

        if (categoriesFlag) {
          const categories = await this.categoryProductionService.listAllProductCategories(i, 10);
          for (const category of categories) {
            // TODO. product category, category-image save
          }

          categoriesFlag = categories.length > 0;
        }

        if (tagsFlag) {
          const tags = await this.tagProductionService.listAllProductTags(i, 10);
          for (const tag of tags) {
            // TODO. tag save
          }

          tagsFlag = tags.length > 0;
        }

        if (productsFlag) {
          const products = await this.listAllProducts(i, 10);
          for (const product of products) {
            const attributes = product.attributes;
            for (const attribute of attributes) {
              // TODO. product-attribute save
            }

            const images = product.iamges;
            for (const image of images) {
              // TODO. product-image save
            }

            // TODO. product save
          }

          productsFlag = products.length > 0;
        }

        await queryRunner.commitTransaction();
      }

      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Database Query Method
   */

  async insert(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async update(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async selectAll(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async select(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async delete(): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
