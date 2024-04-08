export interface IAdapterService {
  getAllProductCategories(): Promise<any>;

  getAllProduct(): Promise<any>;
}
