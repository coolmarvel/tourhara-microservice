import { Injectable } from '@nestjs/common';
import { IAdapterService } from '../interfaces/adapter.interface';

@Injectable()
export class AdapterProductionService implements IAdapterService {
  async getAllCategories(): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
