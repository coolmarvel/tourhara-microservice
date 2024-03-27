import { Injectable } from '@nestjs/common';
import { IProductWebhookService } from '../interfaces/product-webhook.interface';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, QueryRunner } from 'typeorm';
import { CategoryService } from 'src/woocommerce/category/services/category.service';
import { TagService } from 'src/woocommerce/tag/services/tag.service';
import { AttributeService } from 'src/woocommerce/attribute/services/attribute.service';
import { ProductService } from './product.service';

@Injectable()
export class ProductWebhookService implements IProductWebhookService {
  constructor(
    private readonly tagService: TagService,
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
    private readonly attributeService: AttributeService,
    @InjectDataSource('staging') private dataSourceStag: DataSource,
    @InjectDataSource('production') private dataSourceProd: DataSource,
  ) {}

  async productCreated_stag(payload: any): Promise<boolean> {
    console.log(payload);

    const queryRunner: QueryRunner = this.dataSourceStag.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      const categories = payload.categories;
      for (const category of categories) {
        await this.categoryService.saveProductCategory_stag(queryRunner, category);
      }

      const tags = payload.tags;
      for (const tag of tags) {
        await this.tagService.saveProductTag_stag(queryRunner, tag);
      }

      const attributes = payload.attributes;
      for (const attribute of attributes) {
        await this.attributeService.saveProductAttribute_stag(queryRunner, attribute);
      }

      const images = payload.images;
      for (const image of images) {
        await this.productService.saveProductImage_stag(queryRunner, image);
      }

      await this.productService.saveProduct_stag(queryRunner, payload);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }

    return true;
  }

  async productUpdated_stag(payload: any): Promise<boolean> {
    const queryRunner: QueryRunner = this.dataSourceStag.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      const updated = await this.productService.updateWebhookProduct_stag(queryRunner, payload);
      if (!updated) await this.productCreated_stag(payload);

      await queryRunner.commitTransaction();

      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async productDeleted_stag(payload: any): Promise<any> {
    console.log(payload);

    const queryRunner: QueryRunner = this.dataSourceStag.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }

    return true;
  }

  async productRestored_stag(payload: any): Promise<any> {
    console.log(payload);

    const queryRunner: QueryRunner = this.dataSourceStag.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }

    return true;
  }

  async productCreated_prod(payload: any): Promise<any> {
    console.log(payload);

    const queryRunner: QueryRunner = this.dataSourceProd.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }

    return true;
  }

  async productUpdated_prod(payload: any): Promise<any> {
    console.log(payload);

    const queryRunner: QueryRunner = this.dataSourceProd.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }

    return true;
  }

  async productDeleted_prod(payload: any): Promise<any> {
    console.log(payload);

    const queryRunner: QueryRunner = this.dataSourceProd.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }

    return true;
  }

  async productRestored_prod(payload: any): Promise<any> {
    console.log(payload);

    const queryRunner: QueryRunner = this.dataSourceProd.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }

    return true;
  }
}
