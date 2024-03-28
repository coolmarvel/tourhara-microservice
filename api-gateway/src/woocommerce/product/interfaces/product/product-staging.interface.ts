export interface IProductStagingService {
  /**
   * WooCommerce
   */
  createAProduct(data: any): Promise<any>;

  retrieveAProduct(product_id: number): Promise<any>;

  listAllProducts(page: number, size: number): Promise<any>;

  updateAProduct(product_id: number, data: any): Promise<any>;

  deleteAProduct(product_id: number): Promise<any>;

  /**
   * Synchronize
   */
  synchronizeProduct(): Promise<any>;

  /**
   * Webhook
   */
  productCreated(payload: any): Promise<any>;

  productUpdated(payload: any): Promise<any>;

  productDeleted(payload: any): Promise<any>;

  productRestored(payload: any): Promise<any>;
}
