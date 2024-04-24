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
  getSpecifiedProductCategoryByType(product_type_id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  updateProductCategory(product_category_id: string, product_type_id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
