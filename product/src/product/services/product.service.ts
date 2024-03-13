import { Injectable } from '@nestjs/common';
import { IProductService } from '../interfaces/product.interface';

@Injectable()
export class ProductService implements IProductService {
  // WooCommerce Staging Order APIs
  async createAnProduct_stag(name: string, type: string, regular_price: string, description: string, short_description: string, categories: object, images: object): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async retrieveAnProduct_stag(product_id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async listAllProducts_stag(page: number, size: number): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async updateAProduct_stag(product_id: string, data: any): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async deleteAProduct_stag(product_id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  // WooCommerce Production Order APIs
  async createAnProduct_prod(name: string, type: string, regular_price: string, description: string, short_description: string, categories: object, images: object): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async retrieveAnProduct_prod(product_id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async listAllProducts_prod(page: number, size: number): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async updateAProduct_prod(product_id: string, data: any): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async deleteAProduct_prod(product_id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
