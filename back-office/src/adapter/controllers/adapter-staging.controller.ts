import { Controller, Get, Param, Put, Query, VERSION_NEUTRAL } from '@nestjs/common';
import { AdapterStagingService } from '../services/adapter-staging.service';

@Controller({ path: 'api', version: VERSION_NEUTRAL })
export class AdapterStagingController {
  constructor(private readonly adapterService: AdapterStagingService) {}

  @Get('categories')
  async getAllProductCateogires() {
    return await this.adapterService.getAllProductCategories();
  }

  @Get('products')
  async getAllProduct() {
    return await this.adapterService.getAllProduct();
  }

  @Get('types')
  async getAllProductTypes() {
    return await this.adapterService.getAllProductTypes();
  }

  @Get('specified')
  async getAllSpecifiedProduct() {
    return await this.adapterService.getAllSpecifiedProduct();
  }

  @Get('not-specified')
  async getAllNotSpecifiedProduct() {
    return await this.adapterService.getAllNotSpecifiedProduct();
  }

  @Put('update-type/:product_id')
  async updateProductType(@Param() { product_id }: { product_id: string }, @Query() { product_type_id }: { product_type_id: string }) {
    return await this.adapterService.updateProductType(product_id, product_type_id);
  }

  @Get('orders/:product_id')
  async getOrdersWithSpecifiedType(@Param() { product_id }: { product_id: string }) {
    return await this.adapterService.getOrdersWithSpecifiedType(product_id);
  }
}
