import { Injectable } from '@nestjs/common';
import { ICategoryStagingService } from '../interfaces/category-staging.interface';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { ConfigService } from '@nestjs/config';
import { QueryRunner } from 'typeorm';
import { ProductCategoryImage } from '../entities/category-image.entity';
import { ProductCategory } from '../entities/category.entity';

@Injectable()
export class CategoryStagingService implements ICategoryStagingService {
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
    const category = await this.wooCommerce
      .post('products/categories', data)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return category;
  }

  async retrieveAProductCategory(category_id: number): Promise<any> {
    const category = await this.wooCommerce
      .get(`products/categories/${category_id}`)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return category;
  }

  async listAllProductCategories(page: number, size: number): Promise<any> {
    const params = { page, per_page: size };
    const categories = await this.wooCommerce
      .get('products/categories', params)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return categories;
  }

  async updateAProductCategory(category_id: number, data: any): Promise<any> {
    const category = await this.wooCommerce
      .put(`products/categories/${category_id}`, data)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return category;
  }

  async deleteAProductCategory(category_id: number): Promise<any> {
    const category = await this.wooCommerce
      .delete(`products/categories/${category_id}`, { force: true })
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return category;
  }

  /**
   * Database Query Method
   */
  async insert(queryRunner: QueryRunner, category: any): Promise<any> {
    try {
      // product-category save
      const existingProductCategory = await queryRunner.manager.findOne(ProductCategory, { where: { id: category.id } });
      if (existingProductCategory) return false;

      const newProductCategory = {
        id: category.id,
        parent: category.parent,
        name: category.name,
        slug: category.slug,
        description: category.description,
      };
      const productCateogryEntity = queryRunner.manager.create(ProductCategory, newProductCategory);
      const productCategory = await queryRunner.manager.save(productCateogryEntity);

      // product-category-image save
      const image = category.image;
      if (image) {
        const existingProductCategoryImage = await queryRunner.manager.findOne(ProductCategoryImage, { where: { id: image.id } });
        if (!existingProductCategoryImage) {
          const newProductCategoryImage = {
            id: image.id,
            name: image.name === '' ? null : image.name,
            src: image.src,
            alt: image.alt === '' ? null : image.alt,
            dateCreated: image.date_created,
            dateCreatedGmt: image.date_created_gmt,
            dateModified: image.date_modified,
            dateModifiedGmt: image.date_modified_gmt,
            productCategoryId: productCategory.productCategoryId,
          };
          const productCategoryImageEntity = queryRunner.manager.create(ProductCategoryImage, newProductCategoryImage);
          await queryRunner.manager.save(productCategoryImageEntity);
        }
      }

      return productCategory;
    } catch (error) {
      throw error;
    }
  }

  async update(queryRunner: QueryRunner, category: any): Promise<any> {
    try {
    } catch (error) {
      throw error;
    }
  }

  async selectAll(queryRunner: QueryRunner, category: any): Promise<any> {
    try {
    } catch (error) {
      throw error;
    }
  }

  async select(queryRunner: QueryRunner, category_id: any): Promise<any> {
    try {
      const productCategory = await queryRunner.manager.findOne(ProductCategory, { where: { id: category_id } });

      return productCategory;
    } catch (error) {
      throw error;
    }
  }

  async delete(queryRunner: QueryRunner, category: any): Promise<any> {
    try {
    } catch (error) {
      throw error;
    }
  }
}
