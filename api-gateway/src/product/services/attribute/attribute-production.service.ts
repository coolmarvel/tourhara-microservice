import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { IAttributeProductionService } from 'src/product/interfaces/attribute/attribute-production.interface';

@Injectable()
export class AttributeProductionService implements IAttributeProductionService {
  constructor(@Inject('PRODUCT_SERVICE') private client: ClientProxy) {}

  async createAProductAttribute(data: any): Promise<any> {
    const pattern = { cmd: 'createAProductAttribute_woocommerce_production' };
    const payload = data;
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async retrieveAProductAttribute(attribute_id: string | number): Promise<any> {
    const pattern = { cmd: 'retrieveAProductAttribute_woocommerce_production' };
    const payload = { attribute_id };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async listAllProductAttributes(page: number, size: number): Promise<any> {
    const pattern = { cmd: 'listAllProductAttributes_woocommerce_production' };
    const payload = { page, size };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async updateAProductAttribute(attribute_id: string | number, data: any): Promise<any> {
    const pattern = { cmd: 'updateAProductAttribute_woocommerce_production' };
    const payload = { attribute_id, data };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }

  async deleteAProductAttribute(attribute_id: string | number): Promise<any> {
    const pattern = { cmd: 'deleteAProductAttribute_woocommerce_production' };
    const payload = { attribute_id };
    const result = await firstValueFrom(this.client.send(pattern, payload));

    return result;
  }
}
