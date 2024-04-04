import { Injectable } from '@nestjs/common';
import { ICheckListService } from '../interfaces/check-list.interface';
import { QueryRunner } from 'typeorm';

@Injectable()
export class CheckListProductionService implements ICheckListService {
  async insert(queryRunner: QueryRunner, data: any): Promise<any> {
    try {
    } catch (error) {
      throw error;
    }
  }

  async update(queryRunner: QueryRunner, data: any): Promise<any> {
    try {
    } catch (error) {
      throw error;
    }
  }

  async select(queryRunner: QueryRunner): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
