import { Controller, Delete, Get, Post, Put, Query, VERSION_NEUTRAL } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { Public } from 'src/common/decorators/public.decorator';
import { PageReqDto } from 'src/common/dtos/req.dto';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
@ApiExtraModels()
@Controller({ path: 'api/product', version: VERSION_NEUTRAL })
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // WooCommerce Staging Product APIs
  @Public()
  @Post('stag')
  @ApiOperation({ summary: '단일 상품 카테고리 생성 API (스테이징)' })
  async createProductCategory_stag() {}

  @Public()
  @Get('stag/:category_id')
  @ApiOperation({ summary: '단일 상품 카테고리 조회 API (스테이징)' })
  async retrieveProductCategory_stag() {}

  @Public()
  @Get('stag')
  @ApiOperation({ summary: '상품 카테고리 리스트 조회 API (스테이징)' })
  async listAllProductCategories_stag() {}

  @Public()
  @Put('stag/:category_id')
  @ApiOperation({ summary: '단일 상품 카테고리 갱신 API (스테이징)' })
  async updateProductCategory_stag() {}

  @Public()
  @Delete('stag/:category_id')
  @ApiOperation({ summary: '단일 상품 카테고리 삭제 API (스테이징)' })
  async deleteProductCategory_stag() {}

  // WooCommerce Production Product APIs
  @Public()
  @Post('prod')
  @ApiOperation({ summary: '단일 상품 카테고리 생성 API (프로덕션)' })
  async createProductCategory_prod() {}

  @Public()
  @Get('prod/:category_id')
  @ApiOperation({ summary: '단일 상품 카테고리 조회 API (프로덕션)' })
  async retrieveProductCategory_prod() {}

  @Public()
  @Get('prod')
  @ApiOperation({ summary: '상품 카테고리 리스트 조회 API (프로덕션)' })
  async listAllProducts_prod(@Query() { page, size }: PageReqDto) {
    return await this.productService.listAllProducts_prod(page, size);
  }

  @Public()
  @Put('prod/:category_id')
  @ApiOperation({ summary: '단일 상품 카테고리 갱신 API (프로덕션)' })
  async updateProductCategory_prod() {}

  @Public()
  @Delete('prod/:category_id')
  @ApiOperation({ summary: '단일 상품 카테고리 삭제 API (프로덕션)' })
  async deleteProductCategory_prod() {}
}
