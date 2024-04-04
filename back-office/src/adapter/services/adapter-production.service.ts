import { Injectable } from '@nestjs/common';
import { IAdapterService } from '../interfaces/adapter.interface';

@Injectable()
export class AdapterProductionService implements IAdapterService {
  async getAllProductCategories(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async getAllProduct(): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
