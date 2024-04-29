import { Injectable } from '@nestjs/common';
import { IAdapterService } from 'src/adapter/interfaces/adapter.interface';

@Injectable()
export class AdapterProductionService implements IAdapterService {
  getAllProductTypes(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  getAllNotSpecifiedProductCategories(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  getSpecifiedProductCategoryByType(type_id: number): Promise<any> {
    throw new Error('Method not implemented.');
  }
  updateProductCategory(category_id: number, type_id: number): Promise<any> {
    throw new Error('Method not implemented.');
  }
  getAllProducts(type_id: number): Promise<any> {
    throw new Error('Method not implemented.');
  }
  getOrdersByTypeId(type_id: number): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
