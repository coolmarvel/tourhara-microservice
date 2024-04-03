import { Injectable } from '@nestjs/common';
import { ICheckListService } from '../interfaces/check-list.interface';
import { QueryRunner } from 'typeorm';
import { CheckList } from '../entities/check-list.entity';

@Injectable()
export class CheckListStagingService implements ICheckListService {
  async insert(queryRunner: QueryRunner, data: any): Promise<any> {
    try {
      const existingCheckList = await queryRunner.manager.findOne(CheckList, { where: { isoDate: data.date } });
      if (existingCheckList) await this.update(queryRunner, data);
      else {
        const prevDate = new Date(data.date);
        prevDate.setDate(prevDate.getDate() - 1);
        const prevResult = await queryRunner.manager.findOne(CheckList, { where: { isoDate: prevDate.toISOString().split('T')[0] } });

        const newCheckList = {
          isoDate: data.date,
          page: data.page,
          perPage: data.perPage,
          dailyTotal: BigInt(data.total),
          accTotal: prevResult === null ? BigInt(data.total) : BigInt(prevResult.accTotal) + BigInt(data.total),
        };
        const checkListEntity = queryRunner.manager.create(CheckList, newCheckList);
        await queryRunner.manager.save(checkListEntity);
      }

      return true;
    } catch (error) {
      console.error('check-list insert error');

      throw error;
    }
  }

  async update(queryRunner: QueryRunner, data: any): Promise<any> {
    try {
      const updateCheckList: Partial<CheckList> = {
        isoDate: data.date,
        page: data.page,
        perPage: data.perPage,
        dailyTotal: data.total,
      };
      await queryRunner.manager.update(CheckList, { isoDate: data.date }, updateCheckList);

      return true;
    } catch (error) {
      console.error('check-list update error');
      throw error;
    }
  }

  async select(queryRunner: QueryRunner): Promise<any> {
    try {
      const existingCheckList = await queryRunner.manager.findOne(CheckList, { where: { isoDate: '2024-01-01' } });

      if (!existingCheckList) return '2024-01-01';
      else {
        const checkList = await queryRunner.manager.query(`SELECT * FROM check_list WHERE iso_date=(SELECT MAX(iso_date) FROM check_list)`);
        const date = new Date(checkList[0].iso_date);
        date.setDate(date.getDate() + 1);

        return date.toISOString().split('T')[0];
      }
    } catch (error) {
      console.error('select check-list error');
      throw error;
    }
  }
}
