export default interface IWebhookService {
  productCreated(payload: any): Promise<any>;

  productUpdated(payload: any): Promise<any>;

  productDeleted(payload: any): Promise<any>;

  productRestored(payload: any): Promise<any>;
}
