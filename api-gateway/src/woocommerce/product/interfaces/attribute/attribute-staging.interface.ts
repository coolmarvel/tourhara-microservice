export interface IAttributeStagingService {
  createAProductAttribute(data: any): Promise<any>;

  retrieveAProductAttribute(attribute_id: number | string): Promise<any>;

  listAllProductAttributes(page: number, size: number): Promise<any>;

  updateAProductAttribute(attribute_id: number | string, data: any): Promise<any>;

  deleteAProductAttribute(attribute_id: number | string): Promise<any>;
}
