export interface IProductCategoryWebhookService {
  productCategoryCreated_stag(payload: any): Promise<any>;

  productCategoryUpdated_stag(payload: any): Promise<any>;

  productCategoryDeleted_stag(payload: any): Promise<any>;

  productCategoryRestored_stag(payload: any): Promise<any>;

  productCategoryCreated_prod(payload: any): Promise<any>;

  productCategoryUpdated_prod(payload: any): Promise<any>;

  productCategoryDeleted_prod(payload: any): Promise<any>;

  productCategoryRestored_prod(payload: any): Promise<any>;
}
