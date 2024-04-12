import { Injectable } from '@nestjs/common';
import { IAdapterService } from '../interfaces/adapter.interface';
import { ConfigService } from '@nestjs/config';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, QueryRunner } from 'typeorm';
import { Product } from '../entities/products/product.entity';
import { ProductCategory } from '../entities/products/category.entity';
import { IProductAdapterService } from '../interfaces/product-adapter.interface';

@Injectable()
export class AdapterStagingService implements IProductAdapterService {
  constructor(
    private configService: ConfigService,
    @InjectDataSource('staging') private readonly dataSource: DataSource,
  ) {}

  async getAllProductCategories(): Promise<any> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      const categories = await queryRunner.manager.query(`
      SELECT product_category_id, id, name FROM product_category;`);

      return categories;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async getAllProduct(): Promise<any> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1단계: Product 정보 조회
      const products = await queryRunner.manager
        .createQueryBuilder(Product, 'product')
        .select(['product.productId', 'product.id', 'product.name', 'product.price', 'product.regularPrice', 'product.salePrice', 'product.onSale', 'product.productCategoryId'])
        .where('product.purchasable=:purchasable', { purchasable: true })
        .getMany();

      // 2단계: 각 Product의 Category 정보 조회
      for (let product of products) {
        const categories = await Promise.all(
          product.productCategoryId.map(async (categoryId) => {
            return await queryRunner.manager
              .createQueryBuilder(ProductCategory, 'category')
              .select(['category.productCategoryId', 'category.id', 'category.name'])
              .where('category.productCategoryId=:productCategoryId', {
                productCategoryId: categoryId,
              })
              .getOne();
          }),
        );

        // product 객체에서 productCategoryId 속성 삭제
        delete product.productCategoryId;

        // 각 product 객체에 categories 정보 추가
        product['categories'] = categories;
      }

      return products;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async getAllProductTypes(): Promise<any> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      const prodyctTypes = await queryRunner.manager.query(`
      SELECT product_type_id, type FROM product_type;`);

      return prodyctTypes;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async getAllSpecifiedProduct(): Promise<any> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      const products = await queryRunner.manager.query(`
      SELECT product_id, id, name, slug, type, price, regular_price, on_sale, sale_price, product_type_id
      FROM product
      WHERE purchasable=true AND product_type_id IS NOT NULL;`);

      return products;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async getAllNotSpecifiedProduct(): Promise<any> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      // // 1단계: Product 정보 조회
      // const products = await queryRunner.manager
      //   .createQueryBuilder(Product, 'product')
      //   .select(['product.productId', 'product.id', 'product.name', 'product.price', 'product.regularPrice', 'product.salePrice', 'product.onSale', 'product.productCategoryId'])
      //   .where('product.purchasable=:purchasable', { purchasable: true })
      //   .where('product.productTypeId=:productTypeId', { productTypeId: null })
      //   .getMany();

      // // 2단계: 각 Product의 Category 정보 조회
      // for (let product of products) {
      //   const categories = await Promise.all(
      //     product.productCategoryId.map(async (categoryId) => {
      //       return await queryRunner.manager
      //         .createQueryBuilder(ProductCategory, 'category')
      //         .select(['category.productCategoryId', 'category.id', 'category.name'])
      //         .where('category.productCategoryId=:productCategoryId', {
      //           productCategoryId: categoryId,
      //         })
      //         .getOne();
      //     }),
      //   );

      //   // product 객체에서 productCategoryId 속성 삭제
      //   delete product.productCategoryId;

      //   // 각 product 객체에 categories 정보 추가
      //   product['categories'] = categories;
      // }

      const products = await queryRunner.manager.query(`
      SELECT product_id, id, name, slug, type, price, regular_price, on_sale, sale_price, product_type_id
      FROM product
      WHERE purchasable=true AND product_type_id IS NULL;`);

      return products;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async updateProductType(product_id: string, product_type_id: string): Promise<any> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      const updateProduct: Partial<Product> = { productTypeId: product_type_id };
      await queryRunner.manager.update(Product, { productId: product_id }, updateProduct);

      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
