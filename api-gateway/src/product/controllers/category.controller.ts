import { Body, Controller, Delete, Get, Param, Post, Put, Query, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateProductCategoryReqDto, DeleteProductCateogryReqDto, RetrieveProductCategoryReqDto, UpdateCategoryBodyReqDto, UpdateCategoryParamReqDto } from '../dtos/req.dto';
import { CategoryService } from '../services/category.service';
import { PageReqDto, Public } from '../../common';

@ApiTags('Product-Category')
@Controller({ path: 'api/product/category', version: VERSION_NEUTRAL })
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: '단일 카테고리 속성 생성 API' })
  async createAProductCategory(@Body() data: CreateProductCategoryReqDto) {
    return await this.categoryService.createAProductCategory(data);
  }

  @Public()
  @Get(':category_id')
  @ApiOperation({ summary: '단일 카테고리 속성 조회 API' })
  async retrieveAProductCategory(@Param() { category_id }: RetrieveProductCategoryReqDto) {
    return await this.categoryService.retrieveAProductCategory(category_id);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: '카테고리 속성 리스트 조회 API' })
  async listAllProductCategories(@Query() { page, size }: PageReqDto) {
    return await this.categoryService.listAllProductCategories(page, size);
  }

  @Public()
  @Put(':category_id')
  @ApiOperation({ summary: '단일 카테고리 속성 갱신 API' })
  async updateAProductCategory(@Param() { category_id }: UpdateCategoryParamReqDto, @Body() data: UpdateCategoryBodyReqDto) {
    return await this.categoryService.updateAProductCategory(category_id, data);
  }

  @Public()
  @Delete(':category_id')
  @ApiOperation({ summary: '단일 카테고리 속성 삭제 API' })
  async deleteAProductCategory(@Param() { category_id }: DeleteProductCateogryReqDto) {
    return await this.categoryService.deleteAProductCategory(category_id);
  }
}
