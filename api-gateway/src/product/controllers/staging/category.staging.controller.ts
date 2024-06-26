import { Body, Controller, Delete, Get, Param, Post, Put, Query, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { PageReqDto } from 'src/common/dtos/req.dto';
import { CreateProductCategoryReqDto, DeleteProductCateogryReqDto, RetrieveProductCategoryReqDto, UpdateCategoryBodyReqDto, UpdateCategoryParamReqDto } from 'src/product/dtos/req.dto';
import { CategoryStagingService } from 'src/product/services/staging/category.staging.service';

@ApiTags('(Staging) Product-Category')
@Controller({ path: 'api/staging/product/category', version: VERSION_NEUTRAL })
export class CategoryStagingController {
  constructor(private readonly categoryService: CategoryStagingService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: '단일 카테고리 속성 생성 API (스테이징)' })
  async createAProductCategory(@Body() data: CreateProductCategoryReqDto) {
    return await this.categoryService.createAProductCategory(data);
  }

  @Public()
  @Get(':category_id')
  @ApiOperation({ summary: '단일 카테고리 속성 조회 API (스테이징)' })
  async retrieveAProductCategory(@Param() { category_id }: RetrieveProductCategoryReqDto) {
    return await this.categoryService.retrieveAProductCategory(category_id);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: '카테고리 속성 리스트 조회 API (스테이징)' })
  async listAllProductCategories(@Query() { page, size }: PageReqDto) {
    return await this.categoryService.listAllProductCategories(page, size);
  }

  @Public()
  @Put(':category_id')
  @ApiOperation({ summary: '단일 카테고리 속성 갱신 API (스테이징)' })
  async updateAProductCategory(@Param() { category_id }: UpdateCategoryParamReqDto, @Body() data: UpdateCategoryBodyReqDto) {
    return await this.categoryService.updateAProductCategory(category_id, data);
  }

  @Public()
  @Delete(':category_id')
  @ApiOperation({ summary: '단일 카테고리 속성 삭제 API (스테이징)' })
  async deleteAProductCategory(@Param() { category_id }: DeleteProductCateogryReqDto) {
    return await this.categoryService.deleteAProductCategory(category_id);
  }
}
