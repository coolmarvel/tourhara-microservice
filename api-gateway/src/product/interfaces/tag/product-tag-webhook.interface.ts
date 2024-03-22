export interface IProductTagWebhookService {
  productTagCreated_stag(payload: any): Promise<any>;

  productTagUpdated_stag(payload: any): Promise<any>;

  productTagDeleted_stag(payload: any): Promise<any>;

  productTagRestored_stag(payload: any): Promise<any>;

  productTagCreated_prod(payload: any): Promise<any>;

  productTagUpdated_prod(payload: any): Promise<any>;

  productTagDeleted_prod(payload: any): Promise<any>;

  productTagRestored_prod(payload: any): Promise<any>;
}
