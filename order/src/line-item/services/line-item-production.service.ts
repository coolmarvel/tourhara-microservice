import { Injectable } from '@nestjs/common';
import { ILineItemService } from '../interfaces/line-item.interface';
import { QueryRunner } from 'typeorm';

@Injectable()
export class LineItemProductionService implements ILineItemService {
  insert(queryRunner: QueryRunner, lineItem: any, metadata: any, orderId: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
