import { Body, Controller, Get, Param, Put, Query, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { DeclaredCategoryReqDto, GetOrderReqDto, GetOrdersReqDto, UpdateCategoryBodyReqDto, UpdateCategoryParamReqDto } from '../dtos/req.dto';
import { AdapterService } from '../services/adapter.service';
import { Public } from '../../common';

@ApiTags('Adapter')
@Controller({ path: 'api/adapter', version: VERSION_NEUTRAL })
export class AdapterController {
  constructor(private readonly adapterService: AdapterService) {}

  @Public()
  @Get('types')
  @ApiOperation({ summary: '상품 목차 조회 API' })
  async getAllTypes() {
    return await this.adapterService.getAllTypes();
  }

  @Public()
  @Get('types/not')
  @ApiOperation({ summary: '상품 목차 지정되지 않은 카테고리 조회 API' })
  async getAllNotDeclaredCategories() {
    return await this.adapterService.getAllNotDeclaredCategories();
  }

  @Public()
  @Get('types/:type_id')
  @ApiOperation({ summary: '상품 목차 지정된 카테고리 조회 API' })
  async getAllDeclaredCategories(@Param() { type_id }: DeclaredCategoryReqDto) {
    return await this.adapterService.getAllDeclaredCategories(type_id);
  }

  @Public()
  @Put('types/:type_id')
  @ApiOperation({ summary: '상품 목차 갱신 API' })
  async updateCategoryByType(@Param() { type_id }: UpdateCategoryParamReqDto, @Body() { category_id }: UpdateCategoryBodyReqDto) {
    return await this.adapterService.updateCategoryByType(type_id, category_id);
  }

  @Public()
  @Get('orders')
  @ApiOperation({ summary: '주문 리스트 조회 API' })
  async getOrdersByProductId(@Query() { product_id, after, before }: GetOrdersReqDto) {
    // return await this.adapterService.getOrdersByProductId(product_id, after, before);
    return await this.adapterService.getOrders(product_id, after, before);
  }

  @Public()
  @Get('order')
  @ApiOperation({ summary: '단일 주문 조회 API' })
  async getOrderByProductIdAndOrderId(@Query() { product_id, order_id }: GetOrderReqDto) {
    return await this.adapterService.getOrderByProductIdAndOrderId(product_id, order_id);
  }
}
