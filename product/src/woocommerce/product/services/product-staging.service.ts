import { Injectable } from '@nestjs/common';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { ConfigService } from '@nestjs/config';
import { ProductImage } from '../entities/product-image.entity';
import { DataSource, QueryRunner } from 'typeorm';
import { Product } from '../entities/product.entity';
import { TagStagingService } from 'src/woocommerce/tag/services/tag-staging.service';
import { CategoryStagingService } from 'src/woocommerce/category/services/category-staging.service';
import { AttributeStagingService } from 'src/woocommerce/attribute/services/attribute-staging.service';
import { InjectDataSource } from '@nestjs/typeorm';
import { IProductService } from '../interfaces/product.interface';
import { ProductTypeEnum } from '../constants/product-type.enum';
import { ProductType } from '../entities/product-type.entity';

@Injectable()
export class ProductStagingService implements IProductService {
  private wooCommerce: WooCommerceRestApi;

  constructor(
    private configService: ConfigService,
    private tagStagingService: TagStagingService,
    private categoryStagingService: CategoryStagingService,
    private attributeStagingService: AttributeStagingService,
    @InjectDataSource('staging') private dataSource: DataSource,
  ) {
    this.wooCommerce = new WooCommerceRestApi({
      url: this.configService.get('wc-stag.url'),
      consumerKey: this.configService.get('wc-stag.key'),
      consumerSecret: this.configService.get('wc-stag.secret'),
      version: 'wc/v3',
    });
  }

  /**
   * WooCommerce
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
   * Synchronize
   */
  async synchronizeProduct(): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    let categoriesFlag: boolean = true;
    let productsFlag: boolean = true;
    let tagsFlag: boolean = true;

    try {
      await queryRunner.startTransaction();

      console.log('Product migration start');
      for (let i = 1; i < Infinity; i++) {
        if (categoriesFlag === false) break;
        console.log(`Product Category migration (page: ${i})`);

        if (categoriesFlag) {
          const categories = await this.categoryStagingService.listAllProductCategories(i, 10);
          for (const category of categories) {
            // TODO. product category, category-image save
            const productCategory = await this.categoryStagingService.insert(queryRunner, category);
          }

          categoriesFlag = categories.length > 0;
        }
      }
      console.log('Product Category migration success');

      for (let i = 1; i < Infinity; i++) {
        if (tagsFlag === false) break;
        console.log(`Product Tag migration (page: ${i})`);

        if (tagsFlag) {
          const tags = await this.tagStagingService.listAllProductTags(i, 10);
          for (const tag of tags) {
            // TODO. tag save
            const productTag = await this.tagStagingService.insert(queryRunner, tag);
          }

          tagsFlag = tags.length > 0;
        }
      }
      console.log('Product Tag migration success');

      for (let i = 1; i < Infinity; i++) {
        if (productsFlag === false) break;
        console.log(`Product migration (page: ${i})`);

        if (productsFlag) {
          const products = await this.listAllProducts(i, 10);
          for (const product of products) {
            const attributes = product.attributes;
            for (const attribute of attributes) {
              // TODO. product-attribute save
              const productAttribute = await this.attributeStagingService.insert(queryRunner, attribute);
            }

            const images = product.images;
            for (const image of images) {
              // TODO. product-image save
              await this.insert(queryRunner, image, null);
            }

            // TODO. product save
            await this.insert(queryRunner, null, product);
          }

          productsFlag = products.length > 0;
        }
      }
      console.log('Product Attribute migration success');

      const productTypes: ProductTypeEnum[] = [
        ProductTypeEnum.TICKET,
        ProductTypeEnum.TOUR,
        ProductTypeEnum.MUSICAL,
        ProductTypeEnum.USIM,
        ProductTypeEnum.SNAP,
        ProductTypeEnum.STAY,
        ProductTypeEnum.AIRPORT,
      ];
      for (let i = 0; i < productTypes.length; i++) {
        const newProductType = { type: productTypes[i] };
        const productTypeEntity = queryRunner.manager.create(ProductType, newProductType);
        await queryRunner.manager.save(productTypeEntity);
      }
      console.log('Product Type migration success');

      await queryRunner.commitTransaction();
      console.log('Product migration end');

      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async insert(queryRunner: QueryRunner, image: any, product: any): Promise<any> {
    try {
      // product-image save
      if (image !== null && product === null) {
        const existingProductImage = await queryRunner.manager.findOne(ProductImage, { where: { id: image.id } });
        if (existingProductImage) return false;

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
      }

      // product save
      if (image === null && product !== null) {
        const productCategoryIds: string[] = [];
        const productTagIds: string[] = [];
        const productAttributeIds: string[] = [];
        const productImageIds: string[] = [];

        const categories = product.categories;
        for (const category of categories) {
          const productCategory = await this.categoryStagingService.select(queryRunner, category.id);
          productCategoryIds.push(productCategory.productCategoryId);
        }

        const tags = product.tags;
        for (const tag of tags) {
          const productTag = await this.tagStagingService.select(queryRunner, tag.id);
          productTagIds.push(productTag.productTagId);
        }

        const attributes = product.attributes;
        for (const attribute of attributes) {
          const productAttribute = await this.attributeStagingService.select(queryRunner, attribute.id);
          productAttributeIds.push(productAttribute.productAttributeId);
        }

        const images = product.images;
        for (const image of images) {
          const productImage = await this.select(queryRunner, image.id, null);
          productImageIds.push(productImage.productImageId);
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
          productCategoryId: productCategoryIds.length === 0 ? null : productCategoryIds,
          productTagId: productTagIds.length === 0 ? null : productTagIds,
          productImageId: productImageIds.length === 0 ? null : productImageIds,
          productAttributeId: productAttributeIds.length === 0 ? null : productAttributeIds,
          variations: product.variations.length === 0 ? null : product.variations,
          dateCreated: product.date_created,
          dateCreatedGmt: product.date_created_gmt,
          dateModified: product.date_modified,
          dateModifiedGmt: product.date_modified_gmt,
        };
        const productEntity = queryRunner.manager.create(Product, newProduct);
        await queryRunner.manager.save(productEntity);
      }

      return true;
    } catch (error) {
      throw error;
    }
  }

  async update(queryRunner: QueryRunner, image: any, product: any): Promise<any> {
    try {
      // product-image update
      if (image !== null && product === null) {
        const existingProductImage = await queryRunner.manager.findOne(ProductImage, { where: { id: image.id } });
        if (!existingProductImage) return await this.insert(queryRunner, image, null);

        const updateProductImage: Partial<ProductImage> = {
          name: image.name,
          src: image.src,
          alt: image.alt === '' ? null : image.alt,
          dateCreated: image.date_created,
          dateCreatedGmt: image.date_created_gmt,
          dateModified: image.date_modified,
          dateModifiedGmt: image.date_modified_gmt,
        };
        await queryRunner.manager.update(ProductImage, { id: image.id }, updateProductImage);
      }

      // product update
      if (image === null && product !== null) {
        const productCategoryIds: string[] = [];
        const productTagIds: string[] = [];
        const productAttributeIds: string[] = [];
        const productImageIds: string[] = [];

        const categories = product.categories;
        for (const category of categories) {
          const productCategory = await this.categoryStagingService.select(queryRunner, category.id);
          productCategoryIds.push(productCategory.productCategoryId);
        }

        const tags = product.tags;
        for (const tag of tags) {
          const productTag = await this.tagStagingService.select(queryRunner, tag.id);
          productTagIds.push(productTag.productTagId);
        }

        const attributes = product.attributes;
        for (const attribute of attributes) {
          const productAttribute = await this.attributeStagingService.select(queryRunner, attribute.id);
          productAttributeIds.push(productAttribute.productAttributeId);
        }

        const images = product.images;
        for (const image of images) {
          const productImage = await this.select(queryRunner, image.id, null);
          productImageIds.push(productImage.productImageId);
        }

        const updateProduct: Partial<Product> = {
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
          productCategoryId: productCategoryIds.length === 0 ? null : productCategoryIds,
          productTagId: productTagIds.length === 0 ? null : productTagIds,
          productImageId: productImageIds.length === 0 ? null : productImageIds,
          productAttributeId: productAttributeIds.length === 0 ? null : productAttributeIds,
          variations: product.variations.length === 0 ? null : product.variations,
          dateCreated: product.date_created,
          dateCreatedGmt: product.date_created_gmt,
          dateModified: product.date_modified,
          dateModifiedGmt: product.date_modified_gmt,
        };
        await queryRunner.manager.update(Product, { id: product.id }, updateProduct);
      }

      return true;
    } catch (error) {
      throw error;
    }
  }

  async selectAll(queryRunner: QueryRunner, image: any, product: any): Promise<any> {}

  async select(queryRunner: QueryRunner, image_id: any, product_id: any): Promise<any> {
    try {
      if (image_id !== null && product_id === null) {
        const productImage = await queryRunner.manager.findOne(ProductImage, { where: { id: image_id } });

        return productImage;
      }

      if (image_id === null && product_id !== null) {
        const product = await queryRunner.manager.findOne(Product, { where: { id: product_id } });

        return product;
      }
    } catch (error) {
      throw error;
    }
  }

  async delete(queryRunner: QueryRunner, image: any, product: any): Promise<any> {
    try {
      const existingProduct = await queryRunner.manager.findOne(Product, { where: { id: product.id } });
      if (!existingProduct) return true;

      await queryRunner.manager.delete(Product, existingProduct.productId);

      return true;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Webhook
   */
  async productCreated(payload: any): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      const categories = payload.categories;
      for (const category of categories) {
        await this.categoryStagingService.insert(queryRunner, category);
      }

      const tags = payload.tags;
      for (const tag of tags) {
        await this.tagStagingService.insert(queryRunner, tag);
      }

      const attributes = payload.attributes;
      for (const attribute of attributes) {
        await this.attributeStagingService.insert(queryRunner, attribute);
      }

      const images = payload.images;
      for (const image of images) {
        await this.insert(queryRunner, image, null);
      }

      await this.insert(queryRunner, null, payload);

      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async productUpdated(payload: any): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      const existingProduct = await queryRunner.manager.findOne(Product, { where: { id: payload.id } });
      if (!existingProduct) return false;

      const categories = payload.categories;
      for (const category of categories) {
        await this.categoryStagingService.update(queryRunner, category);
      }

      const tags = payload.tags;
      for (const tag of tags) {
        await this.tagStagingService.update(queryRunner, tag);
      }

      const attributes = payload.attributes;
      for (const attribute of attributes) {
        await this.attributeStagingService.update(queryRunner, attribute);
      }

      const images = payload.images;
      for (const image of images) {
        await this.update(queryRunner, image, null);
      }

      const product = payload;
      await this.update(queryRunner, null, product);

      await queryRunner.commitTransaction();

      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async productDeleted(payload: any): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      await this.delete(queryRunner, null, payload);

      await queryRunner.commitTransaction();

      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async productRestored(payload: any): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      const existingProduct = await queryRunner.manager.findOne(Product, { where: { id: payload.id } });
      if (existingProduct) return await this.productUpdated(payload);

      await this.productCreated(payload);

      await queryRunner.commitTransaction();

      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
