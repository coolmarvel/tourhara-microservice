export interface IOrderWebhookService {
  orderCreated_stag(payload: any): Promise<any>;

  orderUpdated_stag(payload: any): Promise<any>;

  orderDeleted_stag(payload: any): Promise<any>;

  orderRestored_stag(payload: any): Promise<any>;

  orderCreated_prod(payload: any): Promise<any>;

  orderUpdated_prod(payload: any): Promise<any>;

  orderDeleted_prod(payload: any): Promise<any>;

  orderRestored_prod(payload: any): Promise<any>;
}
