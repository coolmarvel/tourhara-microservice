export interface IProductWebhookService {
  productCreated_stag(payload: any): Promise<any>;

  productUpdated_stag(payload: any): Promise<any>;

  productDeleted_stag(payload: any): Promise<any>;

  productRestored_stag(payload: any): Promise<any>;

  productCreated_prod(payload: any): Promise<any>;

  productUpdated_prod(payload: any): Promise<any>;

  productDeleted_prod(payload: any): Promise<any>;

  productRestored_prod(payload: any): Promise<any>;
}
