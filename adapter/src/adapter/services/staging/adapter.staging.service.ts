import { Injectable } from '@nestjs/common';
import { IAdapterService } from '../../interfaces/adapter.interface';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, QueryRunner } from 'typeorm';

@Injectable()
export class AdapterStagingService implements IAdapterService {
  constructor(@InjectDataSource('staging') private dataSource: DataSource) {}

  async getAllProductTypes(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();

      try {
        const productTypes = await queryRunner.manager.query(`SELECT product_type_id,type FROM \`product_type\`;`);

        return resolve(productTypes);
      } catch (error) {
        return reject(error);
      } finally {
        await queryRunner.release();
      }
    });
  }

  async getAllNotSpecifiedProductCategories(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();

      try {
        const categories = await queryRunner.manager.query(`
        SELECT 
          product_category_id,id,parent,name,slug,product_type_id 
        FROM \`product_category\` 
        WHERE product_type_id IS NULL
        ORDER BY id ASC;`);

        const categoryMap = {};
        categories.forEach((category: any) => {
          categoryMap[category.id] = {
            product_category_id: category.product_category_id,
            product_type_id: category.product_type_id,
            id: category.id,
            name: category.name,
            slug: category.slug,
            children: [],
          };
        });

        categories.forEach((category: any) => {
          if (category.parent && category.parent !== '0') categoryMap[category.parent].children.push(categoryMap[category.id]);
        });

        const newCategories = Object.values(categoryMap).filter((category: any) => category.children.length > 0 || !categories.some((c) => c.id === category.parent));

        return resolve(newCategories);
      } catch (error) {
        return reject(error);
      } finally {
        await queryRunner.release();
      }
    });
  }

  async getSpecifiedProductCategoryByType(product_type_id: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();

      try {
        const categories = await queryRunner.manager.query(
          `SELECT 
            product_category_id,id,parent,name,slug,product_type_id 
          FROM \`product_category\` 
          WHERE product_type_id=?
          ORDER BY id ASC;`,
          [product_type_id],
        );

        const categoryMap = {};
        categories.forEach((category: any) => {
          categoryMap[category.id] = {
            product_category_id: category.product_category_id,
            id: category.id,
            name: category.name,
            slug: category.slug,
            children: [],
          };
        });

        categories.forEach((category: any) => {
          if (category.parent && category.parent !== '0') categoryMap[category.parent].children.push(categoryMap[category.id]);
        });

        const newCategories = Object.values(categoryMap).filter((category: any) => category.children.length > 0 || !categories.some((c) => c.id === category.parent));

        return resolve(newCategories);
      } catch (error) {
        return reject(error);
      } finally {
        await queryRunner.release();
      }
    });
  }

  async updateProductCategory(product_category_id: string, product_type_id: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();

      try {
        await queryRunner.startTransaction();

        await queryRunner.manager.query(
          `UPDATE \`product_category\` SET 
            product_type_id=?,updated_at=NOW()
          WHERE product_category_id=?;`,
          [product_type_id, product_category_id],
        );

        await queryRunner.commitTransaction();

        return resolve(true);
      } catch (error) {
        return reject(error);
      } finally {
        await queryRunner.release();
      }
    });
  }
}
