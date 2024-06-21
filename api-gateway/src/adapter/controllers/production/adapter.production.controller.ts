import { Body, Controller, Get, Param, Put, Query, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeclaredCategoryReqDto, GetOrdersReqDto, GetOrderReqDto, UpdateCategoryBodyReqDto, UpdateCategoryParamReqDto } from 'src/adapter/dtos/req.dto';
import { AdapterProductionService } from 'src/adapter/services/production/adapter.production.service';
import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('(Production) Adapter')
@Controller({ path: 'api/production/adapter', version: VERSION_NEUTRAL })
export class AdapterProductionController {
  constructor(private readonly adapterService: AdapterProductionService) {}

  @Public()
  @Get('types')
  @ApiOperation({ summary: '상품 목차 조회 API (프로덕션)' })
  getAllTypes() {
    return this.adapterService.getAllTypes();
  }

  @Public()
  @Get('types/not')
  @ApiOperation({ summary: '상품 목차 지정되지 않은 카테고리 조회 API (프로덕션)' })
  getAllNotDeclaredCategories() {
    return this.adapterService.getAllNotDeclaredCategories();
  }

  @Public()
  @Get('types/:type_id')
  @ApiOperation({ summary: '상품 목차 지정된 카테고리 조회 API (프로덕션)' })
  getAllDeclaredCategories(@Param() { type_id }: DeclaredCategoryReqDto) {
    return this.adapterService.getAllDeclaredCategories(type_id);
  }

  @Public()
  @Put('types/:type_id')
  @ApiOperation({ summary: '상품 목차 갱신 API (프로덕션)' })
  updateCategoryByType(@Param() { type_id }: UpdateCategoryParamReqDto, @Body() { category_id }: UpdateCategoryBodyReqDto) {
    return this.adapterService.updateCategoryByType(type_id, category_id);
  }

  @Public()
  @Get('orders')
  @ApiOperation({ summary: '주문 리스트 조회 API - TEST (프로덕션)' })
  getOrdersByProductId(@Query() { product_id, after, before }: GetOrdersReqDto) {
    return this.adapterService.getOrdersByProductId(product_id, after, before);
  }

  @Public()
  @Get('order')
  @ApiOperation({ summary: '단일 주문 조회 API - TEST (프로덕션)' })
  getOrderByProductIdAndOrderId(@Query() { product_id, order_id }: GetOrderReqDto) {
    return this.adapterService.getOrderByProductIdAndOrderId(product_id, order_id);
  }
}
