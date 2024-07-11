import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';

import { logger } from '../../common';
import { IProductService } from '../interfaces';
import { AttributeService, CategoryService, ProductImageService, TagService } from '.';

@Injectable()
export default class ProductService implements IProductService {
  constructor(
    private productImageService: ProductImageService,
    private attributeService: AttributeService,
    private categoryService: CategoryService,
    private tagService: TagService,
  ) {}

  async select(queryRunner: QueryRunner, id: any): Promise<any> {
    try {
      const product = await queryRunner.manager.query(`SELECT * FROM \`product\` WHERE id=?;`, [id]);

      return product[0];
    } catch (error: any) {
      logger.error('Product Service Select Error');
      throw error;
    }
  }

  async insert(queryRunner: QueryRunner, product: any): Promise<any> {
    try {
      const exist = await queryRunner.manager.query(`SELECT * FROM \`product\` WHERE id=?;`, [BigInt(product.id)]);
      if (exist.length > 0) return await this.update(queryRunner, product);

      const tagIds: string[] = [];
      const imageIds: string[] = [];
      const categoryIds: string[] = [];
      const attributeIds: string[] = [];

      const tags = product?.tags;
      for (const tag of tags) {
        const productTag = await this.tagService.select(queryRunner, tag.id);
        tagIds.push(productTag.id);
      }

      const images = product?.images;
      for (const image of images) {
        const productImage = await this.productImageService.select(queryRunner, image.id);
        imageIds.push(productImage.id);
      }

      const categories = product?.categories;
      for (const category of categories) {
        const productCategory = await this.categoryService.select(queryRunner, category.id);
        categoryIds.push(productCategory.id);
      }

      const attributes = product?.attributes;
      for (const attribute of attributes) {
        const productAttribute = await this.attributeService.select(queryRunner, attribute);
        attributeIds.push(productAttribute.attribute_id);
      }

      await queryRunner.manager.query(
        `INSERT INTO \`product\` (
          id, name, slug, type, status, featured, price, regular_price, on_sale, sale_price,
          purchasable, category_id, tag_id, image_id, attribute_id, variations, date_created,
          date_created_gmt, date_modified, date_modified_gmt, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW());`,
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
    } catch (error: any) {
      logger.error('Product Service Select Error');
      throw error;
    }
  }

  async update(queryRunner: QueryRunner, product: any): Promise<any> {
    try {
      const tagIds: string[] = [];
      const imageIds: string[] = [];
      const categoryIds: string[] = [];
      const attributeIds: string[] = [];

      const tags = product?.tags;
      for (const tag of tags) {
        const productTag = await this.tagService.select(queryRunner, tag.id);
        tagIds.push(productTag.id);
      }

      const images = product?.images;
      for (const image of images) {
        const productImage = await this.productImageService.select(queryRunner, image.id);
        imageIds.push(productImage.id);
      }

      const categories = product?.categories;
      for (const category of categories) {
        const productCategory = await this.categoryService.select(queryRunner, category.id);
        categoryIds.push(productCategory.id);
      }

      const attributes = product?.attributes;
      for (const attribute of attributes) {
        const productAttribute = await this.attributeService.select(queryRunner, attribute);
        attributeIds.push(productAttribute.attribute_id);
      }

      await queryRunner.manager.query(
        `UPDATE \`product\` SET
          name=?, slug=?, status=?, featured=?, price=?, regular_price=?, on_sale=?, sale_price=?, 
          purchasable=?, category_id=?, tag_id=?, image_id=?, attribute_id=?, variations=?,
          date_created=?, date_created_gmt=?, date_modified=?, date_modified_gmt=?, updated_at=NOW()
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
    } catch (error: any) {
      logger.error('Product Service Select Error');
      throw error;
    }
  }
}
