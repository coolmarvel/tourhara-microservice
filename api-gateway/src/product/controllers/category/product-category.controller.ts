import { Body, Controller, Delete, Get, Param, Post, Put, Query, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductCategoryService } from '../../services/category/product-category.service';
import { Public } from 'src/common/decorators/public.decorator';
import { PageReqDto } from 'src/common/dtos/req.dto';
import { CreateProductCategoryReqDto, DeleteProductCateogryReqDto, RetrieveProductCategoryReqDto, UpdateProductCategoryBodyReqDto, UpdateProductCategoryParamReqDto } from '../../dtos/req.dto';

@Controller({ path: 'api/product/category', version: VERSION_NEUTRAL })
export class ProductCategoryController {
  constructor(private readonly productCategoryService: ProductCategoryService) {}

  // WooCommerce Staging Product Category APIs
  @Public()
  @Post('stag')
  @ApiTags('Product-Category')
  @ApiOperation({ summary: '단일 상품 카테고리 생성 API (스테이징)' })
  async createAProductCategory_stag(@Body() { name, image }: CreateProductCategoryReqDto) {
    return await this.productCategoryService.createAProductCategory_stag(name, image);
  }

  @Public()
  @Get('stag/:category_id')
  @ApiTags('Product-Category')
  @ApiOperation({ summary: '단일 상품 카테고리 조회 API (스테이징)' })
  async retrieveAProductCategory_stag(@Param() { category_id }: RetrieveProductCategoryReqDto) {
    return await this.productCategoryService.retrieveAProductCategory_stag(category_id);
  }

  @Public()
  @Get('stag')
  @ApiTags('Product-Category')
  @ApiOperation({ summary: '상품 카테고리 리스트 조회 API (스테이징)' })
  async listAllProductCategories_stag(@Query() { page, size }: PageReqDto) {
    return await this.productCategoryService.listAllProductCategories_stag(page, size);
  }

  @Public()
  @Put('stag/:category_id')
  @ApiTags('Product-Category')
  @ApiOperation({ summary: '단일 상품 카테고리 갱신 API (스테이징)' })
  async updateAProductCategory_stag(@Param() { category_id }: UpdateProductCategoryParamReqDto, @Body() data: UpdateProductCategoryBodyReqDto) {
    return await this.productCategoryService.updateAProductCategory_stag(category_id, data);
  }

  @Public()
  @Delete('stag/:category_id')
  @ApiTags('Product-Category')
  @ApiOperation({ summary: '단일 상품 카테고리 삭제 API (스테이징)' })
  async deleteAProductCategory_stag(@Param() { category_id }: DeleteProductCateogryReqDto) {
    return await this.productCategoryService.deleteAProductCategory_stag(category_id);
  }

  // WooCommerce Production Product Category APIs
  @Public()
  @Post('prod')
  @ApiTags('Product-Category')
  @ApiOperation({ summary: '단일 상품 카테고리 생성 API (프로덕션)' })
  async createAProductCategory_prod(@Body() { name, image }: CreateProductCategoryReqDto) {
    return await this.productCategoryService.createAProductCategory_prod(name, image);
  }

  @Public()
  @Get('prod/:category_id')
  @ApiTags('Product-Category')
  @ApiOperation({ summary: '단일 상품 카테고리 조회 API (프로덕션)' })
  async retrieveAProductCategory_prod(@Param() { category_id }: RetrieveProductCategoryReqDto) {
    return await this.productCategoryService.retrieveAProductCategory_prod(category_id);
  }

  @Public()
  @Get('prod')
  @ApiTags('Product-Category')
  @ApiOperation({ summary: '상품 카테고리 리스트 조회 API (프로덕션)' })
  async listAllProductCategories_prod(@Query() { page, size }: PageReqDto) {
    return await this.productCategoryService.listAllProductCategories_prod(page, size);
  }

  @Public()
  @Put('prod/:category_id')
  @ApiTags('Product-Category')
  @ApiOperation({ summary: '단일 상품 카테고리 갱신 API (프로덕션)' })
  async updateAProductCategory_prod(@Param() { category_id }: UpdateProductCategoryParamReqDto, @Body() data: UpdateProductCategoryBodyReqDto) {
    return await this.productCategoryService.updateAProductCategory_prod(category_id, data);
  }

  @Public()
  @Delete('prod/:category_id')
  @ApiTags('Product-Category')
  @ApiOperation({ summary: '단일 상품 카테고리 삭제 API (프로덕션)' })
  async deleteAProductCategory_prod(@Param() { category_id }: DeleteProductCateogryReqDto) {
    return await this.productCategoryService.deleteAProductCategory_prod(category_id);
  }
}
