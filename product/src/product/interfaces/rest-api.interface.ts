export default interface IRestApiService {
  createAProductAttribute(data: any): Promise<any>;

  retrieveAProductAttribute(attribute_id: number): Promise<any>;

  listAllProductAttributes(page: number, size: number): Promise<any>;

  updateAProductAttribute(attribute_id: number, data: any): Promise<any>;

  deleteAProductAttribute(attribute_id: number): Promise<any>;

  createAProductCategory(data: any): Promise<any>;

  retrieveAProductCategory(category_id: number): Promise<any>;

  listAllProductCategories(page: number, size: number): Promise<any>;

  updateAProductCategory(category_id: number, data: any): Promise<any>;

  deleteAProductCategory(category_id: number): Promise<any>;

  createAProductTag(data: any): Promise<any>;

  retrieveAProductTag(tag_id: number): Promise<any>;

  listAllProductTags(page: number, size: number): Promise<any>;

  updateAProductTag(tag_id: number, data: any): Promise<any>;

  deleteAProductTag(tag_id: number): Promise<any>;

  createAProduct(data: any): Promise<any>;

  retrieveAProduct(product_id: number): Promise<any>;

  listAllProducts(page: number, size: number): Promise<any>;

  updateAProduct(product_id: number, data: any): Promise<any>;

  deleteAProduct(product_id: number): Promise<any>;
}
