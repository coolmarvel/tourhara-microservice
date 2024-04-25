import { Body, Controller, Get, Param, Put, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetProductsReqDto, SpecifiedProductCategoryReqDto, UpdateProductCategoryBodyReqDto, UpdateProductCategoryParamReqDto } from 'src/adapter/dtos/req.dto';
import { AdapterStagingService } from 'src/adapter/services/staging/adapter.staging.service';
import { Public } from 'src/common/decorators/public.decorator';

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
  @Get('types/specified/not')
  @ApiOperation({ summary: '상품 목차 지정되지 않은 카테고리 조회 API (스테이징)' })
  async getAllNotSpecifiedProductCategories() {
    return await this.adapterService.getAllNotSpecifiedProductCategories();
  }

  @Public()
  @Get('types/specified/:product_type_id')
  @ApiOperation({ summary: '상품 목차 지정된 카테고리 조회 API (스테이징)' })
  async getSpecifiedProductCategoryByType(@Param() { product_type_id }: SpecifiedProductCategoryReqDto) {
    return await this.adapterService.getSpecifiedProductCategoryByType(product_type_id);
  }

  @Public()
  @Put('types/:product_category_id')
  @ApiOperation({ summary: '상품 목차 재지정(갱신) API (스테이징)' })
  async updateProductCategory(@Param() { product_category_id }: UpdateProductCategoryParamReqDto, @Body() { product_type_id }: UpdateProductCategoryBodyReqDto) {
    return await this.adapterService.updateProductCategory(product_category_id, product_type_id);
  }

  @Public()
  @Get('products/:product_type_id')
  @ApiOperation({ summary: '상품 리스트 조회 API (스테이징)' })
  async getAllProducts(@Param() { product_type_id }: GetProductsReqDto) {
    return await this.adapterService.getAllProducts(product_type_id);
  }
}
