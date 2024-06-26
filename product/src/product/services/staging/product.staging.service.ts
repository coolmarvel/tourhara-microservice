import { v4 as uuid } from 'uuid';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { Injectable } from '@nestjs/common';
import { IProductService } from 'src/product/interfaces/product.interface';
import { DataSource, QueryRunner } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { TagStagingService } from './tag.staging.service';
import { CategoryStagingService } from './category.staging.service';
import { AttributeStagingService } from './attribute.staging.service';
import { ProductImageStagingService } from './product-image.staging.service';
import { InjectDataSource } from '@nestjs/typeorm';
import { logger } from 'src/common/logger/logger.service';

@Injectable()
export class ProductStagingService implements IProductService {
  private wooCommerce: WooCommerceRestApi;

  constructor(
    private configService: ConfigService,
    private readonly tagService: TagStagingService,
    private readonly categoryService: CategoryStagingService,
    private readonly attributeService: AttributeStagingService,
    private readonly productImageService: ProductImageStagingService,
    @InjectDataSource('staging') private dataSource: DataSource,
  ) {
    this.wooCommerce = new WooCommerceRestApi({
      url: this.configService.get('wc-stag.url'),
      consumerKey: this.configService.get('wc-stag.key'),
      consumerSecret: this.configService.get('wc-stag.secret'),
      version: 'wc/v3',
    });
  }

  createAProduct(data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const product = await this.wooCommerce
        .post('products', data)
        .then((response: any) => response.data)
        .catch((error: any) => error.response.data);

        return resolve(product);
      } catch (error) {
        return reject(error);
      }
    });
  }

  retrieveAProduct(product_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const product = await this.wooCommerce
        .get(`products/${product_id}`)
        .then((response: any) => response.data)
        .catch((error: any) => error.response.data);

        return resolve(product);
      } catch (error) {
        return reject(error);
      }
    });
  }

  listAllProducts(page: number, size: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const params = { page, per_page: size };
        const products = await this.wooCommerce
        .get('products', params)
        .then((response: any) => response.data)
        .catch((error: any) => error.response.data);

        return resolve(products);
      } catch (error) {
        return reject(error);
      }
    });
  }

  updateAProduct(product_id: number, data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const product = await this.wooCommerce
        .put(`products/${product_id}`, data)
        .then((response: any) => response.data)
        .catch((error: any) => error.response.data);

        return resolve(product);
      } catch (error) {
        return reject(error);
      }
    });
  }

  deleteAProduct(product_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const product = await this.wooCommerce
        .delete(`products/${product_id}`, { force: true })
        .then((response: any) => response.data)
        .catch((error: any) => error.response.data);

        return resolve(product);
      } catch (error) {
        return reject(error);
      }
    });
  }

  insert(queryRunner: QueryRunner, product: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingProduct = await queryRunner.manager.query(`SELECT * FROM \`product\` WHERE id=?;`, [BigInt(product.id)]);
        if (existingProduct.length > 0) return resolve(await this.update(queryRunner, product));

        const tagIds: string[] = [];
        const imageIds: string[] = [];
        const categoryIds: string[] = [];
        const attributeIds: string[] = [];

        const tags = product.tags;
        for (const tag of tags) {
          const productTag = await this.tagService.select(queryRunner, tag.id);
          tagIds.push(productTag.id);
        }

        const images = product.images;
        for (const image of images) {
          const productImage = await this.productImageService.select(queryRunner, image.id);
          imageIds.push(productImage.id);
        }

        const categories = product.categories;
        for (const category of categories) {
          const productCategory = await this.categoryService.select(queryRunner, category.id);
          categoryIds.push(productCategory.id);
        }

        const attributes = product.attributes;
        for (const attribute of attributes) {
          const productAttribute = await this.attributeService.select(queryRunner, attribute);
          attributeIds.push(productAttribute.attribute_id);
        }

        await queryRunner.manager.query(
          `INSERT INTO \`product\` (
            id,name,slug,type,status,featured,price,regular_price,on_sale,sale_price,
            purchasable,category_id,tag_id,image_id,attribute_id,
            variations,date_created,date_created_gmt,date_modified,date_modified_gmt,created_at,updated_at
          ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW(),NOW());`,
          [
            BigInt(product.id),
            product.name,
            product.slug === '' ? null : product.slug,
            product.type,
            product.status,
            product.featured,
            product.price === '' ? null : product.price,
            product.regular_price === '' ? null : product.regular_price,
            product.on_sale,
            product.sale_price === '' ? null : product.sale_price,
            product.purchasable === '' ? null : product.purchasable,
            categoryIds.length === 0 ? null : categoryIds.join(','),
            tagIds.length === 0 ? null : tagIds.join(','),
            imageIds.length === 0 ? null : imageIds.join(','),
            attributeIds.length === 0 ? null : attributeIds.join(','),
            product.variations.length === 0 ? null : product.variations.join(','),
            product.date_created !== null ? product.date_created : null,
            product.date_created_gmt !== null ? product.date_created_gmt : null,
            product.date_modified !== null ? product.date_modified : null,
            product.date_modified_gmt !== null ? product.date_modified_gmt : null,
          ],
        );

        return resolve(true);
      } catch (error) {
        logger.error('Product Service Insert Error');
        logger.error(error);
        return reject(error);
      }
    });
  }

  update(queryRunner: QueryRunner, product: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingProduct = await queryRunner.manager.query(`SELECT * FROM \`product\` WHERE id=?;`, [BigInt(product.id)]);
        if (existingProduct.length === 0) return resolve(await this.insert(queryRunner, product));

        const tagIds: string[] = [];
        const imageIds: string[] = [];
        const categoryIds: string[] = [];
        const attributeIds: string[] = [];

        const tags = product.tags;
        for (const tag of tags) {
          const productTag = await this.tagService.select(queryRunner, tag.id);
          tagIds.push(productTag.id);
        }

        const images = product.images;
        for (const image of images) {
          const productImage = await this.productImageService.select(queryRunner, image.id);
          imageIds.push(productImage.id);
        }

        const categories = product.categories;
        for (const category of categories) {
          const productCategory = await this.categoryService.select(queryRunner, category.id);
          categoryIds.push(productCategory.id);
        }

        const attributes = product.attributes;
        for (const attribute of attributes) {
          const productAttribute = await this.attributeService.select(queryRunner, attribute);
          attributeIds.push(productAttribute.attribute_id);
        }

        await queryRunner.manager.query(
          `UPDATE \`product\` SET 
            name=?,slug=?,type=?,status=?,featured=?,price=?,regular_price=?,on_sale=?,sale_price=?,
            purchasable=?,category_id=?,tag_id=?,image_id=?,attribute_id=?,
            variations=?,date_created=?,date_created_gmt=?,date_modified=?,date_modified_gmt=?,updated_at=NOW()
          WHERE id=?;`,
          [
            product.name,
            product.slug === '' ? null : product.slug,
            product.type,
            product.status,
            product.featured,
            product.price === '' ? null : product.price,
            product.regular_price === '' ? null : product.regular_price,
            product.on_sale,
            product.sale_price === '' ? null : product.sale_price,
            product.purchasable === '' ? null : product.purchasable,
            categoryIds.length === 0 ? null : categoryIds.join(','),
            tagIds.length === 0 ? null : tagIds.join(','),
            imageIds.length === 0 ? null : imageIds.join(','),
            attributeIds.length === 0 ? null : attributeIds.join(','),
            product.variations.length === 0 ? null : product.variations.join(','),
            product.date_created !== null ? product.date_created : null,
            product.date_created_gmt !== null ? product.date_created_gmt : null,
            product.date_modified !== null ? product.date_modified : null,
            product.date_modified_gmt !== null ? product.date_modified_gmt : null,
            BigInt(product.id),
          ],
        );

        return resolve(true);
      } catch (error) {
        logger.error('Product Service Update Error');
        logger.error(error);
        return reject(error);
      }
    });
  }

  select(queryRunner: QueryRunner, id: bigint): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const product = await queryRunner.manager.query(`SELECT * FROM \`product\` WHERE id=?;`, [id]);

        return resolve(product[0]);
      } catch (error) {
        logger.error('Product Service Select Error');
        logger.error(error);
        return reject(error);
      }
    });
  }

  productCreated(payload: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();

      try {
        await queryRunner.startTransaction();

        const categories = payload.categories;
        for (const category of categories) {
          await this.categoryService.insert(queryRunner, category);
        }

        const tags = payload.tags;
        for (const tag of tags) {
          await this.tagService.insert(queryRunner, tag);
        }

        const attributes = payload.attributes;
        for (const attribute of attributes) {
          await this.attributeService.insert(queryRunner, attribute);
        }

        const images = payload.images;
        for (const image of images) {
          await this.productImageService.insert(queryRunner, image);
        }

        await this.insert(queryRunner, payload);

        await queryRunner.commitTransaction();

        return resolve(true);
      } catch (error) {
        await queryRunner.rollbackTransaction();
        return reject(error);
      } finally {
        await queryRunner.release();
      }
    });
  }

  productUpdated(payload: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();

      try {
        // await queryRunner.startTransaction();

        // const existingProduct = await queryRunner.manager.findOne(Product, { where: { id: payload.id } });
        // if (!existingProduct) return false;

        // const categories = payload.categories;
        // for (const category of categories) {
        //   await this.categoryService.update(queryRunner, category);
        // }

        // const tags = payload.tags;
        // for (const tag of tags) {
        //   await this.tagService.update(queryRunner, tag);
        // }

        // const attributes = payload.attributes;
        // for (const attribute of attributes) {
        //   await this.attributeService.update(queryRunner, attribute);
        // }

        // const images = payload.images;
        // for (const image of images) {
        //   await this.update(queryRunner, image);
        // }

        // await this.update(queryRunner, payload);

        // await queryRunner.commitTransaction();

        return resolve(true);
      } catch (error) {
        await queryRunner.rollbackTransaction();
        return reject(error);
      } finally {
        await queryRunner.release();
      }
    });
  }

  productDeleted(payload: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();

      try {
        // await queryRunner.startTransaction();

        // await this.delete(queryRunner, payload);

        // await queryRunner.commitTransaction();

        return resolve(true);
      } catch (error) {
        await queryRunner.rollbackTransaction();
        return reject(error);
      } finally {
        await queryRunner.release();
      }
    });
  }

  productRestored(payload: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();

      try {
        // await queryRunner.startTransaction();

        // const existingProduct = await queryRunner.manager.findOne(Product, { where: { id: payload.id } });
        // if (existingProduct) return await this.productUpdated(payload);

        // await this.productCreated(payload);

        // await queryRunner.commitTransaction();

        return resolve(true);
      } catch (error) {
        await queryRunner.rollbackTransaction();
        return reject(error);
      } finally {
        await queryRunner.release();
      }
    });
  }
}
