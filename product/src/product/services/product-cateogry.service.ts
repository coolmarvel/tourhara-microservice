import { Injectable } from '@nestjs/common';
import { IProductCategoryService } from '../interfaces/product-category.interface';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { ProductCategory } from '../entities/product-categoy.entity';
import { ProductCategoryImage } from '../entities/product-category-image.entity';

@Injectable()
export class ProductCategoryService implements IProductCategoryService {
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

  // WooCommerce Staging Product Category APIs
  async createAProductCategory_stag(name: string, image: any): Promise<any> {
    const data = { name, image };
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
  async createAProductCategory_prod(name: string, image: any): Promise<any> {
    const data = { name, image };
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

  /**
   * Database Insert
   */
  insertProductCategories_stag(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async insertProductCategories_prod(): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      for (let i = 1; i < 9999; i++) {
        const params = { page: i, per_page: 10 };
        const categories = await this.wooCommerceProd
          .get('products/categories', params)
          .then((response: any) => response.data)
          .catch((error: any) => error.response.data);

        if (categories.length === 0) break; // No more categories to process, exit the loop.

        for (const category of categories) {
          // Initialize productCategoryImageEntity outside of the if block
          let productCategoryImageEntity: ProductCategoryImage | null = null; // Adjusted to correct entity type

          const image = category.image;
          if (image) {
            const existingCategoryImage = await queryRunner.manager.findOne(ProductCategoryImage, { where: { id: image.id } });

            if (!existingCategoryImage) {
              const newProductCategoryImage = {
                id: image.id,
                name: image.name,
                src: image.src,
                alt: image.alt,
                dateCreated: image.date_created,
                dateCreatedGmt: image.date_created_gmt,
                dateModified: image.date_modified,
                dateModifiedGmt: image.date_modified_gmt,
              };

              productCategoryImageEntity = queryRunner.manager.create(ProductCategoryImage, newProductCategoryImage); // Fixed entity type
              await queryRunner.manager.save(productCategoryImageEntity);
            } else {
              productCategoryImageEntity = existingCategoryImage; // Use existing image entity if found
            }
          }

          const existingCategory = await queryRunner.manager.findOne(ProductCategory, { where: { id: category.id } });

          if (!existingCategory) {
            const newProductCategory = {
              id: category.id,
              parent: category.parent,
              name: category.name,
              slug: category.slug,
              description: category.description,
              productCategoryImageId: productCategoryImageEntity ? productCategoryImageEntity.productCategoryImageId : null, // Correctly use ID or null
            };

            const productCategoryEntity = queryRunner.manager.create(ProductCategory, newProductCategory);
            await queryRunner.manager.save(productCategoryEntity);
          }
        }
      }

      await queryRunner.commitTransaction();

      return 'insertProductCategories_prod success';
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
