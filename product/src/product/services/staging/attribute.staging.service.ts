import { Injectable } from '@nestjs/common';
import { IAttributeService } from 'src/product/interfaces/attribute.interface';
import { DataSource, QueryRunner } from 'typeorm';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { InjectDataSource } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { logger } from 'src/common/logger/logger.service';

@Injectable()
export class AttributeStagingService implements IAttributeService {
  private wooCommerce: WooCommerceRestApi;

  constructor(
    private configService: ConfigService,
    @InjectDataSource('staging') private dataSource: DataSource,
  ) {
    this.wooCommerce = new WooCommerceRestApi({
      url: this.configService.get('wc-stag.url'),
      consumerKey: this.configService.get('wc-stag.key'),
      consumerSecret: this.configService.get('wc-stag.secret'),
      version: 'wc/v3',
    });
  }

  async createAProductAttribute(data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const attribute = await this.wooCommerce
          .post('products/attributes', data)
          .then((response: any) => response.data)
          .catch((error: any) => error.response.data);

        return resolve(attribute);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async retrieveAProductAttribute(attribute_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const attribute = await this.wooCommerce
          .get(`products/attributes/${attribute_id}`)
          .then((response: any) => response.data)
          .catch((error: any) => error.response.data);

        return resolve(attribute);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async listAllProductAttributes(page: number, size: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const params = { page, per_page: size };
        const attributes = await this.wooCommerce
          .get('products/attributes', params)
          .then((response: any) => response.data)
          .catch((error: any) => error.response.data);

        return resolve(attributes);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async updateAProductAttribute(attribute_id: number, data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const attribute = await this.wooCommerce
          .put(`products/attributes/${attribute_id}`, data)
          .then((response: any) => response.data)
          .catch((error: any) => error.response.data);

        return resolve(attribute);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async deleteAProductAttribute(attribute_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const attribute = await this.wooCommerce
          .delete(`products/attributes/${attribute_id}`, { force: true })
          .then((response: any) => response.data)
          .catch((error: any) => error.response.data);

        return resolve(attribute);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async insert(queryRunner: QueryRunner, attribute: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingAttribute = await queryRunner.manager.query(
          `SELECT * FROM \`attribute\` 
          WHERE id=? AND name=? AND position=? AND visible=? AND variation=? AND options=?;`,
          [BigInt(attribute.id), attribute.name, attribute.position, attribute.visible, attribute.variation, attribute.options.join(',')],
        );
        if (existingAttribute.length > 0) return resolve(true);

        await queryRunner.manager.query(
          `INSERT INTO \`attribute\` (
            id,name,position,visible,variation,options,created_at,updated_at
          ) VALUES (?,?,?,?,?,?,NOW(),NOW());`,
          [BigInt(attribute.id), attribute.name, attribute.position, attribute.visible, attribute.variation, attribute.options.join(',')],
        );
        const result = await queryRunner.manager.query(`SELECT LAST_INSERT_ID() as attribute_id;`);

        return resolve(BigInt(result[0].attribute_id));
      } catch (error) {
        logger.error('Attribute Service Insert Error');
        logger.error(error);
        return reject(error);
      }
    });
  }

  async update(queryRunner: QueryRunner, attribute: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingAttribute = await queryRunner.manager.query(
          `SELECT * FROM \`attribute\` 
          WHERE id=? AND name=? AND position=? AND visible=? AND variation=? AND options=?;`,
          [BigInt(attribute.id), attribute.name, attribute.position, attribute.visible, attribute.variation, attribute.options.join(',')],
        );
        if (existingAttribute.length === 0) return resolve(await this.insert(queryRunner, attribute));

        await queryRunner.manager.query(
          `UPDATE \`attribute\` SET 
            name=?,position=?,visible=?,variation=?,options=?,updated_at=NOW()
          WHERE id=?;`,
          [attribute.name, attribute.position, attribute.visible, attribute.variation, attribute.options.join(','), BigInt(attribute.id)],
        );

        return resolve(BigInt(existingAttribute[0].attribute_id));
      } catch (error) {
        logger.error('Attribute Service Update Error');
        logger.error(error);
        return reject(error);
      }
    });
  }

  async select(queryRunner: QueryRunner, attribute: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingAttribute = await queryRunner.manager.query(
          `SELECT * FROM \`attribute\` 
          WHERE id=? AND name=? AND position=? AND visible=? AND variation=? AND options=?;`,
          [BigInt(attribute.id), attribute.name, attribute.position, attribute.visible, attribute.variation, attribute.options.join(',')],
        );

        return resolve(existingAttribute[0]);
      } catch (error) {
        logger.error('Attribute Service Select Error');
        logger.error(error);
        return reject(error);
      }
    });
  }
}
