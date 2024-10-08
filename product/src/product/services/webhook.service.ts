import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { IWebhookService } from '../interfaces';
import { AttributeService, CategoryImageService, CategoryService, ProductImageService, ProductService, TagService } from '.';

@Injectable()
export default class WebhookService implements IWebhookService {
  constructor(
    private dataSource: DataSource,
    private readonly tagService: TagService,
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
    private readonly attributeService: AttributeService,
    private readonly productImageService: ProductImageService,
    private readonly categoryImageService: CategoryImageService,
  ) {}

  async productCreated(payload: any): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      const categories = payload.categories;
      for (const category of categories) {
        const categoryId = await this.categoryService.insert(queryRunner, category);

        const categoryImage = category?.image;
        if (categoryImage) await this.categoryImageService.insert(queryRunner, categoryImage, categoryId);
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

      await this.productService.insert(queryRunner, payload);

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

      const categories = payload.categories;
      for (const category of categories) {
        const categoryId = await this.categoryService.update(queryRunner, category);

        const categoryImage = category?.image;
        if (categoryImage) await this.categoryImageService.update(queryRunner, categoryImage, categoryId);
      }

      const tags = payload.tags;
      for (const tag of tags) {
        await this.tagService.update(queryRunner, tag);
      }

      const attributes = payload.attributes;
      for (const attribute of attributes) {
        await this.attributeService.update(queryRunner, attribute);
      }

      const images = payload.images;
      for (const image of images) {
        await this.productImageService.update(queryRunner, image);
      }

      await this.productService.update(queryRunner, payload);

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
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
