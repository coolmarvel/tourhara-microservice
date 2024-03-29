import { Injectable } from '@nestjs/common';
import { ICategoryService } from '../interfaces/category.interface';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { QueryRunner } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { ProductCategory } from '../entities/category.entity';
import { ProductCategoryImage } from '../entities/category-image.entity';

@Injectable()
export class CategoryService implements ICategoryService {
  private wooCommerceStag: WooCommerceRestApi;
  private wooCommerceProd: WooCommerceRestApi;

  constructor(private configService: ConfigService) {
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

  // WooCommerce Staging Product Category APIs
  async createAProductCategory_stag(data: any): Promise<any> {
    const category = await this.wooCommerceStag
      .post('products/categories', data)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return category;
  }

  async retrieveAProductCategory_stag(category_id: string): Promise<any> {
    const category = await this.wooCommerceStag
      .get(`products/categories/${category_id}`)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return category;
  }

  async listAllProductCategories_stag(page: number, size: number): Promise<any> {
    const params = { page, per_page: size };
    const categories = await this.wooCommerceStag
      .get('products/categories', params)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return categories;
  }

  async updateAProductCategory_stag(category_id: string, data: any): Promise<any> {
    const category = await this.wooCommerceStag
      .put(`products/categories/${category_id}`, data)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return category;
  }

  async deleteAProductCategory_stag(category_id: string): Promise<any> {
    const category = await this.wooCommerceStag
      .delete(`products/categories/${category_id}`, { force: true })
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return category;
  }

  // WooCommerce Production Product Category APIs
  async createAProductCategory_prod(data: any): Promise<any> {
    const category = await this.wooCommerceProd
      .post('products/categories', data)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return category;
  }

  async retrieveAProductCategory_prod(category_id: string): Promise<any> {
    const category = await this.wooCommerceProd
      .get(`products/categories/${category_id}`)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return category;
  }

  async listAllProductCategories_prod(page: number, size: number): Promise<any> {
    const params = { page, per_page: size };
    const categories = await this.wooCommerceProd
      .get('products/categories', params)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return categories;
  }

  async updateAProductCategory_prod(category_id: string, data: any): Promise<any> {
    const category = await this.wooCommerceProd
      .put(`products/categories/${category_id}`, data)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return category;
  }

  async deleteAProductCategory_prod(category_id: string): Promise<any> {
    const category = await this.wooCommerceProd
      .delete(`products/categories/${category_id}`, { force: true })
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return category;
  }

  async saveProductCategory_stag(queryRunner: QueryRunner, category: any): Promise<any> {
    try {
      const existingProductCategory = await queryRunner.manager.findOne(ProductCategory, { where: { id: category.id } });
      if (existingProductCategory) return true;

      const newProductCategory = {
        id: category.id,
        parent: category.parent,
        name: category.name,
        slug: category.slug,
        description: category.description,
      };
      const productCategoryEntity = queryRunner.manager.create(ProductCategory, newProductCategory);
      const productCategory = await queryRunner.manager.save(productCategoryEntity);

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

      return true;
    } catch (error) {
      throw error;
    }
  }

  async saveProductCategory_prod(queryRunner: QueryRunner, category: any): Promise<any> {
    try {
      const existingProductCategory = await queryRunner.manager.findOne(ProductCategory, { where: { id: category.id } });
      if (existingProductCategory) return true;

      const newProductCategory = {
        id: category.id,
        parent: category.parent,
        name: category.name,
        slug: category.slug,
        description: category.description,
      };
      const productCategoryEntity = queryRunner.manager.create(ProductCategory, newProductCategory);
      const productCategory = await queryRunner.manager.save(productCategoryEntity);

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

      return true;
    } catch (error) {
      throw error;
    }
  }
}
