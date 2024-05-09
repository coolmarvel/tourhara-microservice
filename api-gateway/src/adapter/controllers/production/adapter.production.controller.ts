import { Body, Controller, Get, Param, Put, Query, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdaptedOrdersReqDto, DeclaredCategoryReqDto, UpdateCategoryBodyReqDto, UpdateCategoryParamReqDto } from 'src/adapter/dtos/req.dto';
import { AdapterProductionService } from 'src/adapter/services/production/adapter.production.service';
import { Public } from 'src/common/decorators/public.decorator';
import { PageReqDto } from 'src/common/dtos/req.dto';

@ApiTags('(Production) Adapter')
@Controller({ path: 'api/production/adapter', version: VERSION_NEUTRAL })
export class AdapterProductionController {
  constructor(private readonly adapterService: AdapterProductionService) {}

  @Public()
  @Get('types')
  @ApiOperation({ summary: '상품 목차 조회 API (스테이징)' })
  async getAllTypes() {
    return await this.adapterService.getAllTypes();
  }

  @Public()
  @Get('types/not')
  @ApiOperation({ summary: '상품 목차 지정되지 않은 카테고리 조회 API (스테이징)' })
  async getAllNotDeclaredCategories() {
    return await this.adapterService.getAllNotDeclaredCategories();
  }

  @Public()
  @Get('types/:type_id')
  @ApiOperation({ summary: '상품 목차 지정된 카테고리 조회 API (스테이징)' })
  async getAllDeclaredCategories(@Param() { type_id }: DeclaredCategoryReqDto) {
    return await this.adapterService.getAllDeclaredCategories(type_id);
  }

  @Public()
  @Put('types/:type_id')
  @ApiOperation({ summary: '상품 목차 갱신 API (스테이징)' })
  async updateCategoryByType(@Param() { type_id }: UpdateCategoryParamReqDto, @Body() { category_id }: UpdateCategoryBodyReqDto) {
    return await this.adapterService.updateCategoryByType(type_id, category_id);
  }

  @Public()
  @Get('types/:type_id/:category_id')
  @ApiOperation({ summary: '주문 리스트 조회 API (스테이징)' })
  async getAdaptedOrders(@Param() { type_id, category_id }: AdaptedOrdersReqDto, @Query() { page, size }: PageReqDto) {
    return await this.adapterService.getAdaptedOrders(type_id, category_id, page, size);
  }
}
