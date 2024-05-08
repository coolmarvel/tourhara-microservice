import { Body, Controller, Get, Param, Put, Query, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetOrdersReqDto, GetProductsReqDto, SpecifiedProductCategoryReqDto, UpdateProductCategoryBodyReqDto, UpdateProductCategoryParamReqDto } from 'src/adapter/dtos/req.dto';
import { AdapterStagingService } from 'src/adapter/services/staging/adapter.staging.service';
import { Public } from 'src/common/decorators/public.decorator';
import { PageReqDto } from 'src/common/dtos/req.dto';

@ApiTags('(Staging) Adapter')
@Controller({ path: 'api/staging/adapter', version: VERSION_NEUTRAL })
export class AdapterStagingController {
  constructor(private readonly adapterService: AdapterStagingService) {}

  @Public()
  @Get('types')
  @ApiOperation({ summary: '상품 목차 조회 API (스테이징)' })
  async getAllProductTypes() {
    return await this.adapterService.getAllProductTypes();
  }

  @Public()
  @Get('types/not')
  @ApiOperation({ summary: '상품 목차 지정되지 않은 카테고리 조회 API (스테이징)' })
  async getAllNotSpecifiedProductCategories() {
    return await this.adapterService.getAllNotSpecifiedProductCategories();
  }

  @Public()
  @Get('types/:type_id')
  @ApiOperation({ summary: '상품 목차 지정된 카테고리 조회 API (스테이징)' })
  async getSpecifiedProductCategoryByType(@Param() { type_id }: SpecifiedProductCategoryReqDto) {
    return await this.adapterService.getSpecifiedProductCategoryByType(type_id);
  }

  @Public()
  @Put('types/:type_id')
  @ApiOperation({ summary: '상품 목차 갱신 API (스테이징)' })
  async updateProductCategory(@Param() { type_id }: UpdateProductCategoryParamReqDto, @Body() { category_id }: UpdateProductCategoryBodyReqDto) {
    return await this.adapterService.updateProductCategory(type_id, category_id);
  }

  // @Public()
  // @Get('products/:type_id')
  // @ApiOperation({ summary: '상품 리스트 조회 API (스테이징)' })
  // async getAllProducts(@Param() { type_id }: GetProductsReqDto) {
  //   return await this.adapterService.getAllProducts(type_id);
  // }

  @Public()
  @Get('types/:type_id/:category_id')
  @ApiOperation({ summary: '주문 리스트 조회 API (스테이징)' })
  async getOrdersByTypeId(@Param() { type_id, category_id }: GetOrdersReqDto, @Query() { page, size }: PageReqDto) {
    return await this.adapterService.getOrdersByTypeId(type_id, category_id, page, size);
  }
}
