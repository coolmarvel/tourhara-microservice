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

  async updateProductCategory(type_id: number, category_id: number): Promise<any> {
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
        const products = await queryRunner.manager.query(
          `SELECT 
            p.*, 
            pc.name AS category_name, 
            pc.slug AS category_slug, 
            pc.description AS category_description, 
            pt.type AS type
          FROM product p
          INNER JOIN category pc ON p.category_id LIKE CONCAT('%', pc.category_id, '%')
          LEFT JOIN type pt ON pc.type_id = pt.id
          WHERE pt.id = ? OR pt.id IS NOT NULL;`,
          type_id ? [type_id] : [],
        );

        return resolve(products);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async getOrdersByTypeId(type_id: number, category_id: number, page: number, size: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();

      try {
        // Fetch all child category IDs for the specified category recursively
        const categories = await queryRunner.manager.query(
          `
          WITH RECURSIVE category_path AS (
            SELECT c.category_id, c.id, c.parent, c.name, c.type_id
            FROM category c
            WHERE c.category_id = ? AND c.type_id = ?
            UNION ALL
            SELECT c.category_id, c.id, c.parent, c.name, c.type_id
            FROM category c
            JOIN category_path cp ON cp.id = c.parent
            WHERE c.type_id = cp.type_id  -- Ensures the recursion respects the type_id
          )
          SELECT category_id FROM category_path;
        `,
          [category_id, type_id],
        );
        // console.log(categories);
        if (categories.length === 0) return resolve(false);

        // Collect all category IDs including children to a flat array
        const categoryIds = categories.map((value: any) => value.category_id);

        // Fetch products linked to these categories
        const products = await queryRunner.manager.query(
          `SELECT
            p.product_id,
            p.id,
            p.name,
            p.type,
            p.status,
            p.price,
            p.regular_price,
            p.on_sale,
            p.sale_price,
            p.purchasable
          FROM product p
          WHERE EXISTS (
            SELECT 1 FROM category c
            WHERE FIND_IN_SET(c.category_id, p.category_id) > 0 AND c.category_id IN (?)
          )
          ORDER BY p.id;
        `,
          [categoryIds],
        );
        // console.log(products);
        if (products.length === 0) return resolve(false);

        const productIds = products.map((product: any) => product.product_id);

        // Fetch orders and line items iteratively until we have enough orders
        const ordersWithLineItems = [];
        let offset = (page - 1) * size;

        while (ordersWithLineItems.length < size) {
          const orders = await queryRunner.manager.query(`SELECT * FROM \`order\` ORDER BY date_created_gmt DESC LIMIT ? OFFSET ?;`, [size, offset]);
          if (orders.length === 0) break;

          for (const order of orders) {
            const lineItems = await queryRunner.manager.query(`SELECT * FROM line_item WHERE order_id=?;`, [order.order_id]);

            const matchingLineItems = lineItems.filter((lineItem: any) => productIds.includes(lineItem.product_id));
            if (matchingLineItems.length > 0) {
              const payment = await queryRunner.manager.query(`SELECT * FROM \`payment\` WHERE order_id=?;`, [order.order_id]);
              const billing = await queryRunner.manager.query(`SELECT * FROM \`billing\` WHERE order_id=?;`, [order.order_id]);
              const shipping = await queryRunner.manager.query(`SELECT * FROM \`shipping\` WHERE order_id=?;`, [order.order_id]);
              const guestHouse = await queryRunner.manager.query(`SELECT * FROM \`guest_house\` WHERE order_id=?;`, [order.order_id]);
              const jfkOneway = await queryRunner.manager.query(`SELECT * FROM \`jfk_oneway\` WHERE order_id=?;`, [order.order_id]);
              const jfkShuttleRt = await queryRunner.manager.query(`SELECT * FROM \`jfk_shuttle_rt\` WHERE order_id=?;`, [order.order_id]);
              const h2ousim = await queryRunner.manager.query(`SELECT * FROM \`h2ousim\` WHERE order_id=?;`, [order.order_id]);
              const usimInfo = await queryRunner.manager.query(`SELECT * FROM \`usim_info\` WHERE order_id=?;`, [order.order_id]);
              const snapInfo = await queryRunner.manager.query(`SELECT * FROM \`snap_info\` WHERE order_id=?;`, [order.order_id]);
              const tour = await queryRunner.manager.query(`SELECT * FROM \`tour\` WHERE order_id=?;`, [order.order_id]);
              const tourInfo = await queryRunner.manager.query(`SELECT * FROM \`tour_info\` WHERE order_id=?;`, [order.order_id]);

              const orderMetadata = await queryRunner.manager.query(`SELECT * FROM \`order_metadata\` WHERE order_id=?;`, [order.order_id]);
              const lineItemMetadata = await queryRunner.manager.query(`SELECT * FROM \`line_item_metadata\` WHERE line_item_id=?;`, [matchingLineItems[0].line_item_id]);

              const data = {
                order: { ...order, metadata: orderMetadata },
                lineItem: { ...matchingLineItems[0], metadata: lineItemMetadata },
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

              ordersWithLineItems.push(data);
              if (ordersWithLineItems.length >= size) break;
            }
          }

          offset += size;
        }
        console.log(ordersWithLineItems.length);

        return resolve(ordersWithLineItems);

        // const result = await queryRunner.manager.query(
        //   `WITH RECURSIVE CategoryChain AS (
        //     SELECT category_id, id, parent, name, type_id
        //     FROM category
        //     WHERE category_id = ? AND type_id = ?
        //     UNION ALL
        //     SELECT c.category_id, c.id, c.parent, c.name, c.type_id
        //     FROM category c
        //     INNER JOIN CategoryChain cc ON cc.category_id = c.parent
        //     WHERE c.type_id = cc.type_id
        // ),
        // ProductCTE AS (
        //     SELECT p.product_id
        //     FROM product p
        //     JOIN CategoryChain cc ON FIND_IN_SET(cc.category_id, p.category_id) > 0
        // ),
        // FilteredOrders AS (
        //     SELECT DISTINCT o.order_id, o.date_created_gmt
        //     FROM \`order\` o
        //     JOIN line_item li ON o.order_id = li.order_id
        //     JOIN ProductCTE pcte ON li.product_id = pcte.product_id
        //     ORDER BY o.date_created_gmt DESC
        //     LIMIT ? OFFSET ?
        // )
        // SELECT
        //     fo.order_id,
        //     fo.date_created_gmt,
        //     li.line_item_id,
        //     li.product_id,
        //     li.quantity,
        //     li.total,
        //     li.subtotal,
        //     li.subtotal_tax,
        //     li.price,
        //     li.tax_class,
        //     li.name AS line_item_name,
        //     li.product_image_id,
        //     li.parent_name,
        //     li.bundled_by,
        //     li.bundled_item_title,
        //     li.bundled_items,
        //     cc.category_id,
        //     c.type_id
        // FROM FilteredOrders fo
        // JOIN line_item li ON fo.order_id = li.order_id
        // JOIN product p ON li.product_id = p.product_id
        // JOIN CategoryChain cc ON FIND_IN_SET(cc.category_id, p.category_id) > 0
        // JOIN \`order\` o ON fo.order_id = o.order_id
        // JOIN category c ON FIND_IN_SET(c.category_id, p.category_id) > 0
        // ORDER BY fo.date_created_gmt;`,
        //   [category_id, type_id, size, offset],
        // );

        // return resolve(result);
      } catch (error) {
        return reject(error);
      } finally {
        await queryRunner.release();
      }
    });
  }
}
