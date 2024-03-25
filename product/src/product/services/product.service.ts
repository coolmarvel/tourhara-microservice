import { Injectable } from '@nestjs/common';
import { IProductService } from '../interfaces/product.interface';
import { DataSource, QueryRunner } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { Product } from '../entities/product.entity';
import { ProductCategory } from 'src/category/entities/category.entity';
import { ProductTag } from 'src/tag/entities/tag.entity';
import { ProductImage } from '../entities/product-image.entity';
import { ProductAttribute } from 'src/attribute/entities/attribute.entity';
import { CategoryService } from 'src/category/services/category.service';
import { TagService } from 'src/tag/services/tag.service';
import { AttributeService } from 'src/attribute/services/attribute.service';

@Injectable()
export class ProductService implements IProductService {
  private wooCommerceStag: WooCommerceRestApi;
  private wooCommerceProd: WooCommerceRestApi;

  constructor(
    private dataSource: DataSource,
    private configService: ConfigService,

    private readonly tagService: TagService,
    private readonly categoryService: CategoryService,
    private readonly attributeService: AttributeService,
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

  // WooCommerce Staging Product APIs
  async createAProduct_stag(data: any): Promise<any> {
    const product = await this.wooCommerceStag
      .post('products', data)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return product;
  }

  async retrieveAProduct_stag(product_id: string): Promise<any> {
    const product = await this.wooCommerceStag
      .get(`products/${product_id}`)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return product;
  }

  async listAllProducts_stag(page: number, size: number): Promise<any> {
    const params = { page, per_page: size };
    const products = await this.wooCommerceStag
      .get('products', params)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return products;
  }

  async updateAProduct_stag(product_id: string, data: any): Promise<any> {
    const product = await this.wooCommerceStag
      .put(`products/${product_id}`, data)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return product;
  }

  async deleteAProduct_stag(product_id: string): Promise<any> {
    const product = await this.wooCommerceStag
      .delete(`products/${product_id}`, { force: true })
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return product;
  }

  // WooCommerce Production Product APIs
  async createAProduct_prod(data: any): Promise<any> {
    const product = await this.wooCommerceProd
      .post('products', data)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return product;
  }

  async retrieveAProduct_prod(product_id: string): Promise<any> {
    const product = await this.wooCommerceProd
      .get(`products/${product_id}`)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return product;
  }

  async listAllProducts_prod(page: number, size: number): Promise<any> {
    const params = { page, per_page: size };
    const products = await this.wooCommerceProd
      .get('products', params)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return products;
  }

  async updateAProduct_prod(product_id: string, data: any): Promise<any> {
    const product = await this.wooCommerceProd
      .put(`products/${product_id}`, data)
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return product;
  }

  async deleteAProduct_prod(product_id: string): Promise<any> {
    const product = await this.wooCommerceProd
      .delete(`products/${product_id}`, { force: true })
      .then((response: any) => response.data)
      .catch((error: any) => error.response.data);

    return product;
  }

  async saveProduct_stag(queryRunner: QueryRunner, product: any): Promise<any> {
    try {
      const existingProduct = await queryRunner.manager.findOne(Product, { where: { id: product.id } });
      if (existingProduct) return true;

      const categories = product.categories;
      const productCategoryId: string[] = [];
      for (const category of categories) {
        const existingCategory = await queryRunner.manager.findOne(ProductCategory, { where: { id: category.id } });
        if (existingCategory) productCategoryId.push(existingCategory.productCategoryId);
      }

      const tags = product.tags;
      const productTagId: string[] = [];
      for (const tag of tags) {
        const existingTag = await queryRunner.manager.findOne(ProductTag, { where: { id: tag.id } });
        if (existingTag) productTagId.push(existingTag.productTagId);
      }

      const images = product.images;
      const productImageId: string[] = [];
      for (const image of images) {
        const existingImage = await queryRunner.manager.findOne(ProductImage, { where: { id: image.id } });
        if (existingImage) productImageId.push(existingImage.productImageId);
      }

      const attributes = product.attributes;
      const productAttributeId: string[] = [];
      for (const attribute of attributes) {
        const existingAttribute = await queryRunner.manager.findOne(ProductAttribute, {
          where: {
            id: attribute.id,
            name: attribute.name,
            position: attribute.position,
            visible: attribute.visible,
            variation: attribute.variation,
            options: attribute.options,
          },
        });
        if (existingAttribute) productAttributeId.push(existingAttribute.productAttributeId);
      }

      const newProduct = {
        id: product.id,
        name: product.name,
        slug: product.slug,
        type: product.type,
        status: product.status,
        featured: product.featured,
        price: product.price === '' ? null : product.price,
        regularPrice: product.regular_price === '' ? null : product.regular_price,
        onSale: product.on_sale,
        salePrice: product.sale_price === '' ? null : product.sale_price,
        purchasable: product.purchasable === '' ? null : product.purchasable,
        productCategoryId: productCategoryId.length === 0 ? null : productCategoryId,
        productTagId: productTagId.length === 0 ? null : productTagId,
        productImageId: productImageId.length === 0 ? null : productImageId,
        productAttributeId: productAttributeId.length === 0 ? null : productAttributeId,
        variations: product.variations.length === 0 ? null : product.variations,
        dateCreated: product.date_created,
        dateCreatedGmt: product.date_created_gmt,
        dateModified: product.date_modified,
        dateModifiedGmt: product.date_modified_gmt,
      };
      const productEntity = queryRunner.manager.create(Product, newProduct);
      await queryRunner.manager.save(productEntity);

      return true;
    } catch (error) {
      throw error;
    }
  }

  async saveProduct_prod(queryRunner: QueryRunner, product: any): Promise<any> {
    try {
      const existingProduct = await queryRunner.manager.findOne(Product, { where: { id: product.id } });
      if (existingProduct) return true;

      const categories = product.categories;
      const productCategoryId: string[] = [];
      for (const category of categories) {
        const existingCategory = await queryRunner.manager.findOne(ProductCategory, { where: { id: category.id } });
        if (existingCategory) productCategoryId.push(existingCategory.productCategoryId);
      }

      const tags = product.tags;
      const productTagId: string[] = [];
      for (const tag of tags) {
        const existingTag = await queryRunner.manager.findOne(ProductTag, { where: { id: tag.id } });
        if (existingTag) productTagId.push(existingTag.productTagId);
      }

      const images = product.images;
      const productImageId: string[] = [];
      for (const image of images) {
        const existingImage = await queryRunner.manager.findOne(ProductImage, { where: { id: image.id } });
        if (existingImage) productImageId.push(existingImage.productImageId);
      }

      const attributes = product.attributes;
      const productAttributeId: string[] = [];
      for (const attribute of attributes) {
        const existingAttribute = await queryRunner.manager.findOne(ProductAttribute, {
          where: {
            id: attribute.id,
            name: attribute.name,
            position: attribute.position,
            visible: attribute.visible,
            variation: attribute.variation,
            options: attribute.options,
          },
        });
        if (existingAttribute) productAttributeId.push(existingAttribute.productAttributeId);
      }

      const newProduct = {
        id: product.id,
        name: product.name,
        slug: product.slug,
        type: product.type,
        status: product.status,
        featured: product.featured,
        price: product.price === '' ? null : product.price,
        regularPrice: product.regular_price === '' ? null : product.regular_price,
        onSale: product.on_sale,
        salePrice: product.sale_price === '' ? null : product.sale_price,
        purchasable: product.purchasable === '' ? null : product.purchasable,
        productCategoryId: productCategoryId.length === 0 ? null : productCategoryId,
        productTagId: productTagId.length === 0 ? null : productTagId,
        productImageId: productImageId.length === 0 ? null : productImageId,
        productAttributeId: productAttributeId.length === 0 ? null : productAttributeId,
        variations: product.variations.length === 0 ? null : product.variations,
        dateCreated: product.date_created,
        dateCreatedGmt: product.date_created_gmt,
        dateModified: product.date_modified,
        dateModifiedGmt: product.date_modified_gmt,
      };
      const productEntity = queryRunner.manager.create(Product, newProduct);
      await queryRunner.manager.save(productEntity);

      return true;
    } catch (error) {
      throw error;
    }
  }

  async saveProductImage_stag(queryRunner: QueryRunner, image: any): Promise<any> {
    try {
      const existingProductImage = await queryRunner.manager.findOne(ProductImage, { where: { id: image.id } });
      if (existingProductImage) return true;

      const newProductImage = {
        id: image.id,
        name: image.name,
        src: image.src,
        alt: image.alt === '' ? null : image.alt,
        dateCreated: image.date_created,
        dateCreatedGmt: image.date_created_gmt,
        dateModified: image.date_modified,
        dateModifiedGmt: image.date_modified_gmt,
      };
      const productImageEntity = queryRunner.manager.create(ProductImage, newProductImage);
      await queryRunner.manager.save(productImageEntity);

      return true;
    } catch (error) {
      throw error;
    }
  }

  async saveProductImage_prod(queryRunner: QueryRunner, image: any): Promise<any> {
    try {
      const existingProductImage = await queryRunner.manager.findOne(ProductImage, { where: { id: image.id } });
      if (existingProductImage) return true;

      const newProductImage = {
        id: image.id,
        name: image.name,
        src: image.src,
        alt: image.alt === '' ? null : image.alt,
        dateCreated: image.date_created,
        dateCreatedGmt: image.date_created_gmt,
        dateModified: image.date_modified,
        dateModifiedGmt: image.date_modified_gmt,
      };
      const productImageEntity = queryRunner.manager.create(ProductImage, newProductImage);
      await queryRunner.manager.save(productImageEntity);

      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }

  async synchronizeProduct_stag(): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    let categoriesFlag: boolean = true;
    let productsFlag: boolean = true;
    let tagsFlag: boolean = true;

    try {
      for (let i = 1; i < Infinity; i++) {
        await queryRunner.startTransaction();

        if (categoriesFlag === false && productsFlag === false && tagsFlag === false) break;
        console.log(`Product data migration (page: ${i})`);
        const params = { page: i, per_page: 10 };

        if (categoriesFlag) {
          const categories = await this.wooCommerceStag
            .get('products/categories', params)
            .then((response: any) => response.data)
            .catch((error: any) => error.response.data);

          for (const category of categories) {
            // 상품 카테고리, 상품 카테고리 이미지 저장
            await this.categoryService.saveProductCategory_stag(queryRunner, category);
          }

          categoriesFlag = categories.length > 0;
        }

        if (tagsFlag) {
          const tags = await this.wooCommerceStag
            .get('products/tags', params)
            .then((response: any) => response.data)
            .catch((error: any) => error.response.data);

          for (const tag of tags) {
            // 상품 태그 저장
            await this.tagService.saveProductTag_stag(queryRunner, tag);
          }

          tagsFlag = tags.length > 0;
        }

        if (productsFlag) {
          const products = await this.wooCommerceStag
            .get('products', params)
            .then((response: any) => response.data)
            .catch((error: any) => error.response.data);

          for (const product of products) {
            const attributes = product.attributes;

            for (const attribute of attributes) {
              // 상품 속성 저장
              await this.attributeService.saveProductAttribute_stag(queryRunner, attribute);
            }

            const images = product.images;

            for (const image of images) {
              // 상품 이미지 저장
              await this.saveProductImage_stag(queryRunner, image);
            }

            // 상품 저장
            await this.saveProduct_stag(queryRunner, product);
          }

          productsFlag = products.length > 0;
        }

        await queryRunner.commitTransaction();
      }
      console.log(`Product data migration complete`);

      return 'synchronizeProduct_stag success';
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async synchronizeProduct_prod(): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    let categoriesFlag: boolean = true;
    let productsFlag: boolean = true;
    let tagsFlag: boolean = true;

    try {
      for (let i = 1; i < Infinity; i++) {
        await queryRunner.startTransaction();

        if (categoriesFlag === false && productsFlag === false && tagsFlag === false) break;
        console.log(`Product data migration (page: ${i})`);
        const params = { page: i, per_page: 10 };

        if (categoriesFlag) {
          const categories = await this.wooCommerceProd
            .get('products/categories', params)
            .then((response: any) => response.data)
            .catch((error: any) => error.response.data);

          for (const category of categories) {
            // 상품 카테고리, 상품 카테고리 이미지 저장
            await this.categoryService.saveProductCategory_stag(queryRunner, category);
          }

          categoriesFlag = categories.length > 0;
        }

        if (tagsFlag) {
          const tags = await this.wooCommerceProd
            .get('products/tags', params)
            .then((response: any) => response.data)
            .catch((error: any) => error.response.data);

          for (const tag of tags) {
            // 상품 태그 저장
            await this.tagService.saveProductTag_stag(queryRunner, tag);
          }

          tagsFlag = tags.length > 0;
        }

        if (productsFlag) {
          const products = await this.wooCommerceProd
            .get('products', params)
            .then((response: any) => response.data)
            .catch((error: any) => error.response.data);

          for (const product of products) {
            const attributes = product.attributes;

            for (const attribute of attributes) {
              // 상품 속성 저장
              await this.attributeService.saveProductAttribute_stag(queryRunner, attribute);
            }

            const images = product.images;

            for (const image of images) {
              // 상품 이미지 저장
              await this.saveProductImage_stag(queryRunner, image);
            }

            // 상품 저장
            await this.saveProduct_stag(queryRunner, product);
          }

          productsFlag = products.length > 0;
        }

        await queryRunner.commitTransaction();
      }
      console.log(`Product data migration complete`);

      return 'synchronizeProduct_stag success';
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
