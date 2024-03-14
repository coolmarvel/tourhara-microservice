import { Injectable } from '@nestjs/common';
import { IProductCategoryService } from '../interfaces/product-category.interface';

@Injectable()
export class ProductCategoryService implements IProductCategoryService {}
