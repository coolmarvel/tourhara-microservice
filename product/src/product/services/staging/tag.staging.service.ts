import { Injectable } from '@nestjs/common';
import { ITagService } from 'src/product/interfaces/tag.interface';
import { QueryRunner } from 'typeorm';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { ConfigService } from '@nestjs/config';
import { logger } from 'src/common/logger/logger.service';

@Injectable()
export class TagStagingService implements ITagService {
  private wooCommerce: WooCommerceRestApi;

  constructor(private configService: ConfigService) {
    this.wooCommerce = new WooCommerceRestApi({
      url: this.configService.get('wc-stag.url'),
      consumerKey: this.configService.get('wc-stag.key'),
      consumerSecret: this.configService.get('wc-stag.secret'),
      version: 'wc/v3',
    });
  }

  createAProductTag(data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const tag = await this.wooCommerce
        .post('products/tags', data)
        .then((response: any) => response.data)
        .catch((error: any) => error.response.data);

        return resolve(tag);
      } catch (error) {
        return reject(error);
      }
    });
  }

  retrieveAProductTag(tag_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const tag = await this.wooCommerce
        .get(`products/tags/${tag_id}`)
        .then((response: any) => response.data)
        .catch((error: any) => error.response.data);

        return resolve(tag);
      } catch (error) {
        return reject(error);
      }
    });
  }

  listAllProductTags(page: number, size: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const params = { page, per_page: size };
        const tags = await this.wooCommerce
        .get('products/tags', params)
        .then((response: any) => response.data)
        .catch((error: any) => error.response.data);

        return resolve(tags);
      } catch (error) {
        return reject(error);
      }
    });
  }

  updateAProductTag(tag_id: number, data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const tag = await this.wooCommerce
        .put(`products/tags/${tag_id}`, data)
        .then((response: any) => response.data)
        .catch((error: any) => error.response.data);

        return resolve(tag);
      } catch (error) {
        return reject(error);
      }
    });
  }

  deleteAProductTag(tag_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const tag = await this.wooCommerce
        .delete(`products/tags/${tag_id}`, { force: true })
        .then((response: any) => response.data)
        .catch((error: any) => error.response.data);

        return resolve(tag);
      } catch (error) {
        return reject(error);
      }
    });
  }

  insert(queryRunner: QueryRunner, tag: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingTag = await queryRunner.manager.query(`SELECT * FROM \`tag\` WHERE id=?;`, [BigInt(tag.id)]);
        if (existingTag.length > 0) return resolve(await this.update(queryRunner, tag));

        await queryRunner.manager.query(
          `INSERT INTO \`tag\` (
            id,name,slug,count,created_at,updated_at
          ) VALUES (?,?,?,?,NOW(),NOW());`,
          [BigInt(tag.id), tag.name === '' ? null : tag.name, tag.slug === '' ? null : tag.slug, tag.count],
        );

        return resolve(BigInt(tag.id));
      } catch (error) {
        logger.error('Tag Service Insert Error');
        logger.error(error);
        return reject(error);
      }
    });
  }

  update(queryRunner: QueryRunner, tag: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingTag = await queryRunner.manager.query(`SELECT * FROM \`tag\` WHERE id=?;`, [BigInt(tag.id)]);
        if (existingTag.length === 0) return resolve(await this.insert(queryRunner, tag));

        await queryRunner.manager.query(
          `UPDATE \`tag\` SET 
            name=?,slug=?,count=?,updated_at=NOW()
          WHERE id=?;`,
          [tag.name === '' ? null : tag.name, tag.slug === '' ? null : tag.slug, tag.count, BigInt(tag.id)],
        );

        return resolve(BigInt(existingTag[0].id));
      } catch (error) {
        logger.error('Tag Service Update Error');
        logger.error(error);
        return reject(error);
      }
    });
  }

  select(queryRunner: QueryRunner, id: bigint): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const tag = await queryRunner.manager.query(`SELECT * FROM \`tag\` WHERE id=?;`, [id]);

        return resolve(tag[0]);
      } catch (error) {
        logger.error('Tag Service Select Error');
        logger.error(error);
        return reject(error);
      }
    });
  }
}
