import { Body, Controller, Delete, Get, Param, Post, Put, Query, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { PageReqDto } from 'src/common/dtos/req.dto';
import { CreateProductCategoryReqDto, DeleteProductCateogryReqDto, RetrieveProductCategoryReqDto, UpdateProductCategoryBodyReqDto, UpdateProductCategoryParamReqDto } from 'src/product/dtos/req.dto';
import { CategoryProductionService } from 'src/product/services/production/category.production.service';

@ApiTags('(Production) Product-Category')
@Controller({ path: 'api/production/product/category', version: VERSION_NEUTRAL })
export class CategoryProductionController {
  constructor(private readonly categoryService: CategoryProductionService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: '단일 카테고리 속성 생성 API (프로덕션)' })
  async createAProductCategory(@Body() data: CreateProductCategoryReqDto) {
    return await this.categoryService.createAProductCategory(data);
  }

  @Public()
  @Get(':category_id')
  @ApiOperation({ summary: '단일 카테고리 속성 조회 API (프로덕션)' })
  async retrieveAProductCategory(@Param() { category_id }: RetrieveProductCategoryReqDto) {
    return await this.categoryService.retrieveAProductCategory(category_id);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: '카테고리 속성 리스트 조회 API (프로덕션)' })
  async listAllProductCategories(@Query() { page, size }: PageReqDto) {
    return await this.categoryService.listAllProductCategories(page, size);
  }

  @Public()
  @Put(':category_id')
  @ApiOperation({ summary: '단일 카테고리 속성 갱신 API (프로덕션)' })
  async updateAProductCategory(@Param() { category_id }: UpdateProductCategoryParamReqDto, @Body() data: UpdateProductCategoryBodyReqDto) {
    return await this.categoryService.updateAProductCategory(category_id, data);
  }

  @Public()
  @Delete(':category_id')
  @ApiOperation({ summary: '단일 카테고리 속성 삭제 API (프로덕션)' })
  async deleteAProductCategory(@Param() { category_id }: DeleteProductCateogryReqDto) {
    return await this.categoryService.deleteAProductCategory(category_id);
  }
}
