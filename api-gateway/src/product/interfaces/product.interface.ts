import { CreateProductReqDto } from '../dtos/req.dto';

export interface IProductService {
  createAProduct_stag(data: CreateProductReqDto): Promise<any>;

  retrieveAProduct_stag(product_id: string): Promise<any>;

  listAllProducts_stag(page: number, size: number): Promise<any>;

  updateAProduct_stag(product_id: string, data: any): Promise<any>;

  deleteAProduct_stag(product_id: string): Promise<any>;

  createAProduct_prod(data: CreateProductReqDto): Promise<any>;

  retrieveAProduct_prod(product_id: string): Promise<any>;

  listAllProducts_prod(page: number, size: number): Promise<any>;

  updateAProduct_prod(product_id: string, data: any): Promise<any>;

  deleteAProduct_prod(product_id: string): Promise<any>;

  // --

  insertProductImage_prod(): Promise<any>;

  insertProductAttribute_prod(): Promise<any>;
}
