export interface IProductAdapterService {
  getAllProductTypes(): Promise<any>;

  getAllSpecifiedProduct(): Promise<any>;

  getAllNotSpecifiedProduct(): Promise<any>;

  updateProductType(product_id: string, product_type_id: string): Promise<any>;
}
