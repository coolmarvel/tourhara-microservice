import { Body, Controller, Delete, Get, Param, Post, Put, Query, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductCategoryService } from '../services/product-category.service';
import { Public } from 'src/common/decorators/public.decorator';
import { PageReqDto } from 'src/common/dtos/req.dto';

@ApiTags('Product')
@Controller({ path: 'api/product/category', version: VERSION_NEUTRAL })
export class ProductCategoryController {
  constructor(private readonly productCategoryService: ProductCategoryService) {}

  // WooCommerce Staging Product Category APIs
  @Public()
  @Post('stag')
  @ApiOperation({ summary: '단일 상품 카테고리 생성 API (스테이징)' })
  async createProductCategory_stag(@Body() { name, image }: { name: string; image: any }) {
    return await this.productCategoryService.createProductCategory_stag(name, image);
  }

  @Public()
  @Get('stag/:category_id')
  @ApiOperation({ summary: '단일 상품 카테고리 조회 API (스테이징)' })
  async retrieveProductCategory_stag(@Param() { category_id }: { category_id: string }) {
    return await this.productCategoryService.retrieveProductCategory_stag(category_id);
  }

  @Public()
  @Get('stag')
  @ApiOperation({ summary: '상품 카테고리 리스트 조회 API (스테이징)' })
  async listAllProductCategories_stag(@Query() { page, size }: PageReqDto) {
    return await this.productCategoryService.listAllProductCategories_stag(page, size);
  }

  @Public()
  @Put('stag/:category_id')
  @ApiOperation({ summary: '단일 상품 카테고리 갱신 API (스테이징)' })
  async updateProductCategory_stag(@Param() { category_id }: { category_id: string }, @Body() data: any) {
    return await this.productCategoryService.updateProductCategory_stag(category_id, data);
  }

  @Public()
  @Delete('stag/:category_id')
  @ApiOperation({ summary: '단일 상품 카테고리 삭제 API (스테이징)' })
  async deleteProductCategory_stag(@Param() { category_id }: { category_id: string }) {
    return await this.productCategoryService.deleteProductCategory_stag(category_id);
  }

  // WooCommerce Production Product Category APIs
  @Public()
  @Post('prod')
  @ApiOperation({ summary: '단일 상품 카테고리 생성 API (프로덕션)' })
  async createProductCategory_prod(@Body() { name, image }: { name: any; image: any }) {
    return await this.productCategoryService.createProductCategory_prod(name, image);
  }

  @Public()
  @Get('prod/:category_id')
  @ApiOperation({ summary: '단일 상품 카테고리 조회 API (프로덕션)' })
  async retrieveProductCategory_prod(@Param() { category_id }: { category_id: string }) {
    return await this.productCategoryService.retrieveProductCategory_prod(category_id);
  }

  @Public()
  @Get('prod')
  @ApiOperation({ summary: '상품 카테고리 리스트 조회 API (프로덕션)' })
  async listAllProducts_prod(@Query() { page, size }: PageReqDto) {
    return await this.productCategoryService.listAllProductCategories_prod(page, size);
  }

  @Public()
  @Put('prod/:category_id')
  @ApiOperation({ summary: '단일 상품 카테고리 갱신 API (프로덕션)' })
  async updateProductCategory_prod(@Param() { category_id }: { category_id: string }, @Body() data: any) {
    return await this.productCategoryService.updateProductCategory_prod(category_id, data);
  }

  @Public()
  @Delete('prod/:category_id')
  @ApiOperation({ summary: '단일 상품 카테고리 삭제 API (프로덕션)' })
  async deleteProductCategory_prod(@Param() { category_id }: { category_id: string }) {
    return await this.productCategoryService.deleteProductCategory_prod(category_id);
  }
}
