export interface IProductProductionService {
  createAProduct(data: any): Promise<any>;

  retrieveAProduct(product_id: number): Promise<any>;

  listAllProducts(page: number, size: number): Promise<any>;

  updateAProduct(product_id: number, data: any): Promise<any>;

  deleteAProduct(product_id: number): Promise<any>;

  synchronizeProductByWooCommerce(): Promise<any>;

  insert(): Promise<any>;

  update(): Promise<any>;

  selectAll(): Promise<any>;

  select(): Promise<any>;

  delete(): Promise<any>;
}
