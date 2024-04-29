import { Injectable } from '@nestjs/common';
import { ICheckListService } from 'src/order/interfaces/check-list.interface';
import { QueryRunner } from 'typeorm';
import { logger } from 'src/common/logger/logger.service';

@Injectable()
export class CheckListStagingService implements ICheckListService {
  async select(queryRunner: QueryRunner): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingCheckList = await queryRunner.manager.query(
          `SELECT * FROM \`check_list\` 
          WHERE iso_date=?;`,
          ['2024-01-01'],
        );
        if (existingCheckList.length === 0) return resolve('2024-01-01');

        const checkList = await queryRunner.manager.query(`SELECT * FROM \`check_list\` WHERE iso_date=(SELECT MAX(iso_date) FROM \`check_list\`);`);
        const date = new Date(checkList[0].iso_date);
        date.setDate(date.getDate() + 1);

        return resolve(date.toISOString().split('T')[0]);
      } catch (error) {
        logger.error('CheckList Service Select Error');
        logger.error(error);
        return reject(error);
      }
    });
  }

  async insert(queryRunner: QueryRunner, data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingCheckList = await queryRunner.manager.query(
          `SELECT * FROM \`check_list\` 
          WHERE iso_date=?;`,
          [data.date],
        );
        if (existingCheckList.length > 0) return resolve(await this.update(queryRunner, data));

        const prevDate = new Date(data.date);
        prevDate.setDate(prevDate.getDate() - 1);
        const prevResult = await queryRunner.manager.query(
          `SELECT * FROM \`check_list\` 
          WHERE iso_date=?;`,
          [prevDate.toISOString().split('T')[0]],
        );

        await queryRunner.manager.query(
          `INSERT INTO \`check_list\` (
            iso_date,page,per_page,daily_total,acc_total,created_at,updated_at
          ) VALUES (?,?,?,?,?,NOW(),NOW());`,
          [data.date, data.page, data.per_page, data.total, prevResult.length === 0 ? data.total : BigInt(prevResult[0].acc_total) + BigInt(data.total)],
        );

        return resolve(true);
      } catch (error) {
        logger.error('CheckList Service Insert Error');
        logger.error(error);
        return reject(error);
      }
    });
  }

  async update(queryRunner: QueryRunner, data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        await queryRunner.manager.query(
          `UPDATE \`check_list\` SET 
            page=?,per_page=?,daily_total=?,updated_at=NOW()
          WHERE iso_date=?;`,
          [data.page, data.per_page, data.total, data.date],
        );

        return resolve(true);
      } catch (error) {
        logger.error('CheckList Service Update Error');
        logger.error(error);
        return reject(error);
      }
    });
  }
}
