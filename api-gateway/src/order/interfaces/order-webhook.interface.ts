export interface IOrderWebhookService {
  orderCreated_stag(data: any): Promise<any>;

  orderUpdated_stag(data: any): Promise<any>;

  orderDeleted_stag(data: any): Promise<any>;

  orderRestored_stag(data: any): Promise<any>;

  orderCreated_prod(data: any): Promise<any>;

  orderUpdated_prod(data: any): Promise<any>;

  orderDeleted_prod(data: any): Promise<any>;

  orderRestored_prod(data: any): Promise<any>;
}
