export interface IAttributeWebhookService {
  productAttributeCreated_stag(payload: any): Promise<any>;

  productAttributeUpdated_stag(payload: any): Promise<any>;

  productAttributeDeleted_stag(payload: any): Promise<any>;

  productAttributeRestored_stag(payload: any): Promise<any>;

  productAttributeCreated_prod(payload: any): Promise<any>;

  productAttributeUpdated_prod(payload: any): Promise<any>;

  productAttributeDeleted_prod(payload: any): Promise<any>;

  productAttributeRestored_prod(payload: any): Promise<any>;
}
