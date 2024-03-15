export interface IProductService {
  createAnProduct_stag(name: string, type: string, regular_price: string, description: string, short_description: string, categories: object, images: object): Promise<any>;

  retrieveAnProduct_stag(product_id: string): Promise<any>;

  listAllProducts_stag(page: number, size: number): Promise<any>;

  updateAProduct_stag(product_id: string, data: any): Promise<any>;

  deleteAProduct_stag(product_id: string): Promise<any>;

  createAnProduct_prod(name: string, type: string, regular_price: string, description: string, short_description: string, categories: object, images: object): Promise<any>;

  retrieveAnProduct_prod(product_id: string): Promise<any>;

  listAllProducts_prod(page: number, size: number): Promise<any>;

  updateAProduct_prod(product_id: string, data: any): Promise<any>;

  deleteAProduct_prod(product_id: string): Promise<any>;
}
