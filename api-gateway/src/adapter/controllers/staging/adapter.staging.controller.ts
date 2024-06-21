import { Body, Controller, Get, Param, Put, Query, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeclaredCategoryReqDto, GetOrderReqDto, GetOrdersReqDto, UpdateCategoryBodyReqDto, UpdateCategoryParamReqDto } from 'src/adapter/dtos/req.dto';
import { AdapterStagingService } from 'src/adapter/services/staging/adapter.staging.service';
import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('(Staging) Adapter')
@Controller({ path: 'api/staging/adapter', version: VERSION_NEUTRAL })
export class AdapterStagingController {
  constructor(private readonly adapterService: AdapterStagingService) {}

  @Public()
  @Get('types')
  @ApiOperation({ summary: '상품 목차 조회 API (스테이징)' })
  getAllTypes() {
    return this.adapterService.getAllTypes();
  }

  @Public()
  @Get('types/not')
  @ApiOperation({ summary: '상품 목차 지정되지 않은 카테고리 조회 API (스테이징)' })
  getAllNotDeclaredCategories() {
    return this.adapterService.getAllNotDeclaredCategories();
  }

  @Public()
  @Get('types/:type_id')
  @ApiOperation({ summary: '상품 목차 지정된 카테고리 조회 API (스테이징)' })
  getAllDeclaredCategories(@Param() { type_id }: DeclaredCategoryReqDto) {
    return this.adapterService.getAllDeclaredCategories(type_id);
  }

  @Public()
  @Put('types/:type_id')
  @ApiOperation({ summary: '상품 목차 갱신 API (스테이징)' })
  updateCategoryByType(@Param() { type_id }: UpdateCategoryParamReqDto, @Body() { category_id }: UpdateCategoryBodyReqDto) {
    return this.adapterService.updateCategoryByType(type_id, category_id);
  }

  @Public()
  @Get('orders')
  @ApiOperation({ summary: '주문 리스트 조회 API - TEST (스테이징)' })
  getOrdersByProductId(@Query() { product_id, after, before }: GetOrdersReqDto) {
    return this.adapterService.getOrdersByProductId(product_id, after, before);
  }

  @Public()
  @Get('order')
  @ApiOperation({ summary: '단일 주문 조회 API - TEST (스테이징)' })
  getOrderByProductIdAndOrderId(@Query() { product_id, order_id }: GetOrderReqDto) {
    return this.adapterService.getOrderByProductIdAndOrderId(product_id, order_id);
  }
}
