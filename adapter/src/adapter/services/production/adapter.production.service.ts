import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { IAdapterService } from 'src/adapter/interfaces/adapter.interface';
import { DataSource, QueryRunner } from 'typeorm';

@Injectable()
export class AdapterProductionService implements IAdapterService {
  constructor(@InjectDataSource('production') private dataSource: DataSource) {}

  getAllTypes(): Promise<any> {
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

  getAllNotDeclaredCategories(): Promise<any> {
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

  getAllDeclaredCategories(type_id: number): Promise<any> {
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

  updateCategoryByType(type_id: number, category_id: number): Promise<any> {
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

  getOrdersByProductId(product_id: string, after: string, before: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();

      try {
        const result = [];

        const productIds = product_id.split(',');
        const placeholders = productIds.map(() => '?').join(', ');

        const orders = await queryRunner.manager.query(`SELECT * FROM \`order\` WHERE date_created_gmt>=? AND date_created_gmt<=?;`, [`${after}T00:00:00.000Z`, `${before}T23:59:59.999Z`]);
        for (const order of orders) {
          const lineItems = await queryRunner.manager.query(`SELECT * FROM line_item WHERE order_id=? AND product_id IN (${placeholders});`, [order.id, ...productIds]);

          if (lineItems.length > 0) {
            const payment = await queryRunner.manager.query(`SELECT * FROM \`payment\` WHERE order_id=?;`, [order.id]);
            const billing = await queryRunner.manager.query(`SELECT * FROM \`billing\` WHERE order_id=?;`, [order.id]);
            const shipping = await queryRunner.manager.query(`SELECT * FROM \`shipping\` WHERE order_id=?;`, [order.id]);
            const guestHouse = await queryRunner.manager.query(`SELECT * FROM \`guest_house\` WHERE order_id=?;`, [order.id]);
            const jfkOneway = await queryRunner.manager.query(`SELECT * FROM \`jfk_oneway\` WHERE order_id=?;`, [order.id]);
            const jfkShuttleRt = await queryRunner.manager.query(`SELECT * FROM \`jfk_shuttle_rt\` WHERE order_id=?;`, [order.id]);
            const h2ousim = await queryRunner.manager.query(`SELECT * FROM \`h2ousim\` WHERE order_id=?;`, [order.id]);
            const usimInfo = await queryRunner.manager.query(`SELECT * FROM \`usim_info\` WHERE order_id=?;`, [order.id]);
            const snapInfo = await queryRunner.manager.query(`SELECT * FROM \`snap_info\` WHERE order_id=?;`, [order.id]);
            const tour = await queryRunner.manager.query(`SELECT * FROM \`tour\` WHERE order_id=?;`, [order.id]);
            const tourInfo = await queryRunner.manager.query(`SELECT * FROM \`tour_info\` WHERE order_id=?;`, [order.id]);

            const orderMetadata = await queryRunner.manager.query(`SELECT * FROM \`order_metadata\` WHERE order_id=?;`, [order.id]);

            for (let i = 0; i < lineItems.length; i++) {
              const lineItemMetadata = await queryRunner.manager.query(`SELECT * FROM \`line_item_metadata\` WHERE line_item_id=?;`, [lineItems[i].id]);

              const data = {
                order: { ...order, metadata: orderMetadata },
                lineItem: { ...lineItems[i], metadata: lineItemMetadata },
                payment: payment[0],
                billing: billing[0],
                shipping: shipping[0],
                guestHouse: guestHouse[0],
                jfkOneway: jfkOneway[0],
                jfkShuttleRt: jfkShuttleRt[0],
                h2ousim: h2ousim[0],
                usimInfo: usimInfo[0],
                tour: tour[0],
                tourInfo: tourInfo[0],
                snapInfo: snapInfo[0],
              };

              result.push(data);
            }
          }
        }

        return resolve(result);
      } catch (error) {
        return reject(error);
      } finally {
        queryRunner.release();
      }
    });
  }

  getOrderByProductIdAndOrderId(product_id: string, order_id: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();

      try {
        const productIds = product_id.split(',');
        const placeholders = productIds.map(() => '?').join(', ');

        const order = await queryRunner.manager.query(`SELECT * FROM \`order\` WHERE id=?;`, [order_id]);
        const lineItems = await queryRunner.manager.query(`SELECT * FROM \`line_item\` WHERE order_id=? AND product_id IN (${placeholders})`, [order_id, ...productIds]);

        if (lineItems.length > 0) {
          const payment = await queryRunner.manager.query(`SELECT * FROM \`payment\` WHERE order_id=?;`, [order_id]);
          const billing = await queryRunner.manager.query(`SELECT * FROM \`billing\` WHERE order_id=?;`, [order_id]);
          const shipping = await queryRunner.manager.query(`SELECT * FROM \`shipping\` WHERE order_id=?;`, [order_id]);
          const guestHouse = await queryRunner.manager.query(`SELECT * FROM \`guest_house\` WHERE order_id=?;`, [order_id]);
          const jfkOneway = await queryRunner.manager.query(`SELECT * FROM \`jfk_oneway\` WHERE order_id=?;`, [order_id]);
          const jfkShuttleRt = await queryRunner.manager.query(`SELECT * FROM \`jfk_shuttle_rt\` WHERE order_id=?;`, [order_id]);
          const h2ousim = await queryRunner.manager.query(`SELECT * FROM \`h2ousim\` WHERE order_id=?;`, [order_id]);
          const usimInfo = await queryRunner.manager.query(`SELECT * FROM \`usim_info\` WHERE order_id=?;`, [order_id]);
          const snapInfo = await queryRunner.manager.query(`SELECT * FROM \`snap_info\` WHERE order_id=?;`, [order_id]);
          const tour = await queryRunner.manager.query(`SELECT * FROM \`tour\` WHERE order_id=?;`, [order_id]);
          const tourInfo = await queryRunner.manager.query(`SELECT * FROM \`tour_info\` WHERE order_id=?;`, [order_id]);

          const orderMetadata = await queryRunner.manager.query(`SELECT * FROM \`order_metadata\` WHERE order_id=?;`, [order_id]);

          const lineItemMetadata = await queryRunner.manager.query(`SELECT * FROM \`line_item_metadata\` WHERE line_item_id=?;`, [lineItems[0].id]);

          const data = {
            order: { ...order[0], metadata: orderMetadata },
            lineItem: { ...lineItems[0], metadata: lineItemMetadata },
            payment: payment[0],
            billing: billing[0],
            shipping: shipping[0],
            guestHouse: guestHouse[0],
            jfkOneway: jfkOneway[0],
            jfkShuttleRt: jfkShuttleRt[0],
            h2ousim: h2ousim[0],
            usimInfo: usimInfo[0],
            tour: tour[0],
            tourInfo: tourInfo[0],
            snapInfo: snapInfo[0],
          };

          return resolve(data);
        }
      } catch (error) {
        await queryRunner.rollbackTransaction();

        return reject(error);
      } finally {
        await queryRunner.release();
      }
    });
  }
}
