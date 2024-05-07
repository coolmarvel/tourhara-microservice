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
        const productTypes = await queryRunner.manager.query(`SELECT id,type FROM \`type\`;`);

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
          category_id,id,parent,name,slug,type_id 
        FROM \`category\` 
        WHERE type_id IS NULL
        ORDER BY id ASC;`);

        const categoryMap = {};
        categories.forEach((category: any) => {
          categoryMap[category.id] = {
            category_id: category.category_id,
            type_id: category.type_id,
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

  async getSpecifiedProductCategoryByType(type_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();

      try {
        const categories = await queryRunner.manager.query(
          `SELECT 
            category_id, id, parent, name, slug, type_id 
          FROM \`category\` 
          WHERE type_id=?
          ORDER BY id ASC;`,
          [type_id],
        );

        const categoryMap = {};
        // Initialize map with all categories
        categories.forEach((category: any) => {
          categoryMap[category.id] = {
            category_id: category.category_id,
            id: category.id,
            name: category.name,
            slug: category.slug,
            children: [],
          };
        });

        // Build the tree structure
        categories.forEach((category: any) => {
          if (category.parent && category.parent !== '0' && categoryMap[category.parent]) {
            categoryMap[category.parent].children.push(categoryMap[category.id]);
          }
        });

        // Filter to return only top-level categories, those who do not appear as children
        const childIds = new Set();
        categories.forEach((category: any) => {
          if (category.parent && category.parent !== '0') {
            childIds.add(category.id);
          }
        });

        const topLevelCategories = Object.values(categoryMap).filter((category: any) => {
          return !childIds.has(category.id);
        });

        return resolve(topLevelCategories);
      } catch (error) {
        return reject(error);
      } finally {
        await queryRunner.release();
      }
    });
  }

  async updateProductCategory(category_id: number, type_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();

      try {
        await queryRunner.startTransaction();

        await queryRunner.manager.query(
          `UPDATE \`category\` SET 
            type_id=?,updated_at=NOW()
          WHERE category_id=?;`,
          [type_id, category_id],
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

  async getAllProducts(type_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();

      try {
        let query = `
        SELECT 
        p.*, 
        pc.name AS category_name, 
        pc.slug AS category_slug, 
        pc.description AS category_description, 
        pt.type AS type
      FROM product p
      INNER JOIN category pc ON p.category_id LIKE CONCAT('%', pc.category_id, '%')
      LEFT JOIN type pt ON pc.type_id = pt.id
      WHERE pt.id = ? OR pt.id IS NOT NULL;`;

        const products = await queryRunner.manager.query(query, type_id ? [type_id] : []);

        return resolve(products);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async getOrdersByTypeId(type_id: number, page: number, size: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();

      const offset = (page - 1) * size;

      try {
        const orders = await queryRunner.manager.query(
          `
          SELECT o.* FROM \`order\` o
          INNER JOIN line_item li ON o.order_id = li.order_id
          INNER JOIN product p ON li.product_id = p.product_id
          INNER JOIN category c ON p.category_id = c.category_id
          WHERE c.type_id = ?
          LIMIT ? OFFSET ?;
        `,
          [type_id, size, offset],
        );

        return resolve(orders);
      } catch (error) {
        return reject(error);
      } finally {
        await queryRunner.release();
      }
    });
  }
}
