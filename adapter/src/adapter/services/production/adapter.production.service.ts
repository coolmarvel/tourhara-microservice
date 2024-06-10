import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { IAdapterService } from 'src/adapter/interfaces/adapter.interface';
import { DataSource, QueryRunner } from 'typeorm';

@Injectable()
export class AdapterProductionService implements IAdapterService {
  constructor(@InjectDataSource('production') private dataSource: DataSource) {}

  async getAllTypes(): Promise<any> {
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

  async getAllNotDeclaredCategories(): Promise<any> {
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

  async getAllDeclaredCategories(type_id: number): Promise<any> {
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

  async updateCategoryByType(type_id: number, category_id: number): Promise<any> {
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

  async getAdaptedOrders(type_id: number, category_id: number, start_date: string, end_date: string): Promise<any> {
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
            p.product_id, p.id, p.name, p.type, p.status, p.price,
            p.regular_price, p.on_sale, p.sale_price, p.purchasable
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

        const orders = await queryRunner.manager.query(`SELECT * FROM \`order\` WHERE date_created>=? AND date_created<=?;`, [`${start_date}T00:00:00.000Z`, `${end_date}T23:59:59.999Z`]);
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
          }
        }

        return resolve(ordersWithLineItems);
      } catch (error) {
        return reject(error);
      } finally {
        await queryRunner.release();
      }
    });
  }

  getAllProducts(type_id: number): Promise<any> {
    throw new Error('Method not implemented.');
  }

  getOrdersByProductName(product_name: string, start_date: string, end_date: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();

      try {
        const result = [];
        const orders = await queryRunner.manager.query(`SELECT * FROM \`order\` WHERE date_created_gmt>=? AND date_created_gmt<=?;`, [`${start_date}T00:00:00.000Z`, `${end_date}T23:59:59.999Z`]);

        for (const order of orders) {
          const products = await queryRunner.manager.query(
            `SELECT product_id FROM \`product\` 
            WHERE name LIKE ? AND status=?;`,
            // WHERE tag_id IS NOT NULL AND name LIKE ? AND status=?;`,
            [`%${decodeURIComponent(product_name)}%`, 'publish'],
          );
          const productIds = products.map((product) => product.product_id);
          const placeholders = productIds.map(() => '?').join(', ');
          const lineItems = await queryRunner.manager.query(`SELECT * FROM line_item WHERE order_id=? AND product_id IN (${placeholders});`, [order.order_id, ...productIds]);

          if (lineItems.length > 0) {
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

            for (let i = 0; i < lineItems.length; i++) {
              const lineItemMetadata = await queryRunner.manager.query(`SELECT * FROM \`line_item_metadata\` WHERE line_item_id=?;`, [lineItems[i].line_item_id]);

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
          const lineItems = await queryRunner.manager.query(`SELECT * FROM line_item WHERE order_id=? AND product_id IN (${placeholders});`, [order.order_id, ...productIds]);

          if (lineItems.length > 0) {
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

            for (let i = 0; i < lineItems.length; i++) {
              const lineItemMetadata = await queryRunner.manager.query(`SELECT * FROM \`line_item_metadata\` WHERE line_item_id=?;`, [lineItems[i].line_item_id]);

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
      }
    });
  }
}
