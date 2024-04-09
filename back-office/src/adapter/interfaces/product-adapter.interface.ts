export interface IProductAdapterService {
  getAllProductTypes(): Promise<any>;

  getAllSpecifiedProduct(): Promise<any>;

  getAllNotSpecifiedProduct(): Promise<any>;
}
