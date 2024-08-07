export interface IWebhookService {
  orderCreated(payload: any): Promise<any>;

  orderUpdated(payload: any): Promise<any>;

  orderDeleted(payload: any): Promise<any>;

  orderRestored(payload: any): Promise<any>;
}
