import { Injectable } from '@nestjs/common';
import { ILineItemService } from '../interfaces/line-item.interface';
import { QueryRunner } from 'typeorm';
import { LineItem } from '../entities/line-item.entity';

@Injectable()
export class LineItemStagingService implements ILineItemService {
  async insert(queryRunner: QueryRunner, lineItem: any, metadata: any, orderId: string): Promise<any> {
    try {
      const existingLineItem = await queryRunner.manager.findOne(LineItem, { where: { id: lineItem.id } });
      if (existingLineItem) return true;

      const newLineItem = {};
    } catch (error) {
      throw error;
    }
  }
}
