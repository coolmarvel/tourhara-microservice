import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QueryRunner } from 'typeorm';

import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

import { IAttributeService } from 'src/product/interfaces/attribute.interface';
import { logger } from 'src/common/logger/logger.service';

@Injectable()
export class AttributeService implements IAttributeService {
  private wooCommerce: WooCommerceRestApi;

  constructor(private configService: ConfigService) {
    this.wooCommerce = new WooCommerceRestApi({
      url: this.configService.get('wc.url'),
      consumerKey: this.configService.get('wc.key'),
      consumerSecret: this.configService.get('wc.secret'),
      version: 'wc/v3',
    });
  }

  async createAProductAttribute(data: any): Promise<any> {
    try {
      return await this.wooCommerce
        .post('products/attributes', data)
        .then((response: any) => response.data)
        .catch((error: any) => error.response.data);
    } catch (error) {
      throw error;
    }
  }

  async retrieveAProductAttribute(attribute_id: number): Promise<any> {
    try {
      return await this.wooCommerce
        .get(`products/attributes/${attribute_id}`)
        .then((response: any) => response.data)
        .catch((error: any) => error.response.data);
    } catch (error) {
      throw error;
    }
  }

  async listAllProductAttributes(page: number, size: number): Promise<any> {
    try {
      const params = { page, per_page: size };
      return await this.wooCommerce
        .get('products/attributes', params)
        .then((response: any) => response.data)
        .catch((error: any) => error.response.data);
    } catch (error) {
      throw error;
    }
  }

  async updateAProductAttribute(attribute_id: number, data: any): Promise<any> {
    try {
      return await this.wooCommerce
        .put(`products/attributes/${attribute_id}`, data)
        .then((response: any) => response.data)
        .catch((error: any) => error.response.data);
    } catch (error) {
      throw error;
    }
  }

  async deleteAProductAttribute(attribute_id: number): Promise<any> {
    try {
      return await this.wooCommerce
        .delete(`products/attributes/${attribute_id}`, { force: true })
        .then((response: any) => response.data)
        .catch((error: any) => error.response.data);
    } catch (error) {
      throw error;
    }
  }

  async insert(queryRunner: QueryRunner, attribute: any): Promise<any> {
    try {
      const existingAttribute = await queryRunner.manager.query(
        `SELECT * FROM \`attribute\` 
          WHERE id=? AND name=? AND position=? AND visible=? AND variation=? AND options=?;`,
        [BigInt(attribute.id), attribute.name, attribute.position, attribute.visible, attribute.variation, attribute.options.join(',')],
      );
      if (existingAttribute.length > 0) return true;

      await queryRunner.manager.query(
        `INSERT INTO \`attribute\` (
            id,name,position,visible,variation,options,created_at,updated_at
          ) VALUES (?,?,?,?,?,?,NOW(),NOW());`,
        [BigInt(attribute.id), attribute.name, attribute.position, attribute.visible, attribute.variation, attribute.options.join(',')],
      );
      const result = await queryRunner.manager.query(`SELECT LAST_INSERT_ID() as attribute_id;`);

      return BigInt(result[0].attribute_id);
    } catch (error) {
      logger.error('Attribute Service Insert Error');
      logger.error(error);
      throw error;
    }
  }

  async update(queryRunner: QueryRunner, attribute: any): Promise<any> {
    try {
      const existingAttribute = await queryRunner.manager.query(
        `SELECT * FROM \`attribute\` 
          WHERE id=? AND name=? AND position=? AND visible=? AND variation=? AND options=?;`,
        [BigInt(attribute.id), attribute.name, attribute.position, attribute.visible, attribute.variation, attribute.options.join(',')],
      );
      if (existingAttribute.length === 0) return await this.insert(queryRunner, attribute);

      await queryRunner.manager.query(
        `UPDATE \`attribute\` SET 
            name=?,position=?,visible=?,variation=?,options=?,updated_at=NOW()
          WHERE id=?;`,
        [attribute.name, attribute.position, attribute.visible, attribute.variation, attribute.options.join(','), BigInt(attribute.id)],
      );

      return BigInt(existingAttribute[0].id);
    } catch (error) {
      logger.error('Attribute Service Update Error');
      logger.error(error);
      throw error;
    }
  }

  async select(queryRunner: QueryRunner, attribute: any): Promise<any> {
    try {
      const existingAttribute = await queryRunner.manager.query(
        `SELECT * FROM \`attribute\` 
          WHERE id=? AND name=? AND position=? AND visible=? AND variation=? AND options=?;`,
        [BigInt(attribute.id), attribute.name, attribute.position, attribute.visible, attribute.variation, attribute.options.join(',')],
      );

      return existingAttribute[0];
    } catch (error) {
      logger.error('Attribute Service Select Error');
      logger.error(error);
      throw error;
    }
  }
}
