import { Body, Controller, Delete, Get, Param, Post, Put, Query, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { PageReqDto } from 'src/common/dtos/req.dto';
import { CreateProductCategoryReqDto, DeleteProductCateogryReqDto, RetrieveProductCategoryReqDto, UpdateProductCategoryBodyReqDto, UpdateProductCategoryParamReqDto } from 'src/product/dtos/req.dto';
import { CategoryProductionService } from 'src/product/services/category/category-production.service';

@ApiTags('WooCommerce-Product-Category-Production')
@Controller({ path: 'api/product/category/production', version: VERSION_NEUTRAL })
export class CategoryProductionController {
  constructor(private readonly categoryProductionService: CategoryProductionService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: '단일 카테고리 속성 생성 API (프로덕션)' })
  async createAProductCategory(@Body() data: CreateProductCategoryReqDto) {
    return await this.categoryProductionService.createAProductCategory(data);
  }

  @Public()
  @Get(':category_id')
  @ApiOperation({ summary: '단일 카테고리 속성 조회 API (프로덕션)' })
  async retrieveAProductCategory(@Param() { category_id }: RetrieveProductCategoryReqDto) {
    return await this.categoryProductionService.retrieveAProductCategory(category_id);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: '카테고리 속성 리스트 조회 API (프로덕션)' })
  async listAllProductCategories(@Query() { page, size }: PageReqDto) {
    return await this.categoryProductionService.listAllProductCategories(page, size);
  }

  @Public()
  @Put(':category_id')
  @ApiOperation({ summary: '단일 카테고리 속성 갱신 API (프로덕션)' })
  async updateAProductCategory(@Param() { category_id }: UpdateProductCategoryParamReqDto, @Body() data: UpdateProductCategoryBodyReqDto) {
    return await this.categoryProductionService.updateAProductCategory(category_id, data);
  }

  @Public()
  @Delete(':category_id')
  @ApiOperation({ summary: '단일 카테고리 속성 삭제 API (프로덕션)' })
  async deleteAProductCategory(@Param() { category_id }: DeleteProductCateogryReqDto) {
    return await this.categoryProductionService.deleteAProductCategory(category_id);
  }
}
