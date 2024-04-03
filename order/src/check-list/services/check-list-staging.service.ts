import { Injectable } from '@nestjs/common';
import { ICheckListService } from '../interfaces/check-list.interface';
import { QueryRunner } from 'typeorm';
import { CheckList } from '../entities/check-list.entity';

@Injectable()
export class CheckListStagingService implements ICheckListService {
  async insert(queryRunner: QueryRunner, data: any): Promise<any> {
    try {
      const existingCheckList = await queryRunner.manager.findOne(CheckList, { where: { isoDate: data.date } });
      if (existingCheckList) {
        await this.update(queryRunner, data);
      } else {
        const newCheckList = {
          isoDate: data.date,
          page: data.page,
          perPage: data.perPage,
          total: data.total,
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
        total: data.total,
      };
      await queryRunner.manager.update(CheckList, { isoDate: data.date }, updateCheckList);

      return true;
    } catch (error) {
      console.error('check-list update error');
      throw error;
    }
  }

  async select(queryRunner: QueryRunner, data: any): Promise<any> {
    try {
      const existingCheckList = await queryRunner.manager.findOne(CheckList, { where: { isoDate: new Date('2018-08-20') } });

      if (!existingCheckList) return { isoDate: '2018-08-20' };
      else {
        const checkList = await queryRunner.manager.query(`SELECT * FROM check_list WHERE iso_date=(SELECT MAX(iso_date) FROM check_list)`);

        if (checkList) return { isoDate: checkList.isoDate };
      }
    } catch (error) {
      console.error('select check-list error');
      throw error;
    }
  }
}
