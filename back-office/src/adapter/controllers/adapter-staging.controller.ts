import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
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
}
