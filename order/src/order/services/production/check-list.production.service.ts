import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { ICheckListService } from 'src/order/interfaces/check-list.interface';
import { QueryRunner } from 'typeorm';

@Injectable()
export class CheckListProductionService implements ICheckListService {
  async select(queryRunner: QueryRunner): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingCheckList = await queryRunner.manager.query(`
        SELECT * FROM \`check_list\` WHERE iso_date='2024-01-01';`);
        if (existingCheckList.length === 0) return resolve('2024-01-01');

        const checkList = await queryRunner.manager.query(`
        SELECT * FROM \`check_list\` WHERE iso_date=(SELECT MAX(iso_date) FROM \`check_list\`);`);
        const date = new Date(checkList[0].iso_date);
        date.setDate(date.getDate() + 1);

        return resolve(date.toISOString().split('T')[0]);
      } catch (error) {
        console.error('CheckList Service Select Error');
        console.error(error);
        return reject(error);
      }
    });
  }

  async insert(queryRunner: QueryRunner, data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingCheckList = await queryRunner.manager.query(`
        SELECT * FROM \`check_list\` WHERE iso_date='${data.date}';`);
        if (existingCheckList.length > 0) return resolve(await this.update(queryRunner, data));

        const prevDate = new Date(data.date);
        prevDate.setDate(prevDate.getDate() - 1);
        const prevResult = await queryRunner.manager.query(`
        SELECT * FROM \`check_list\` WHERE iso_date='${prevDate.toISOString().split('T')[0]}';`);

        const checkListId = uuid();
        await queryRunner.manager.query(`
        INSERT INTO \`check_list\` (
          check_list_id, iso_date, page, per_page, daily_total, acc_total, created_at, updated_at
        ) VALUES (
            '${checkListId}',
            '${data.date}',
            '${data.page}',
            '${data.per_page}',
            '${BigInt(data.total)}',
            ${prevResult.length === 0 ? `'${BigInt(data.total)}'` : `'${BigInt(prevResult[0].acc_total) + BigInt(data.total)}'`},
            NOW(), NOW()
        );`);

        return resolve(true);
      } catch (error) {
        console.error('CheckList Service Insert Error');
        console.error(error);
        return reject(error);
      }
    });
  }

  async update(queryRunner: QueryRunner, data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        await queryRunner.manager.query(`
        UPDATE \`check_list\` SET page='${data.page}', per_page='${data.perPage}', daily_total='${data.total}'
        WHERE iso_date='${data.date}';`);

        return resolve(true);
      } catch (error) {
        console.error('CheckList Service Update Error');
        console.error(error);
        return reject(error);
      }
    });
  }
}
