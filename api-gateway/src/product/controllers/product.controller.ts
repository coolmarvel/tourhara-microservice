import { Body, Controller, Delete, Get, Param, Post, Put, Query, VERSION_NEUTRAL } from '@nestjs/common';
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
  @ApiOperation({ summary: '단일 상품 생성 API (스테이징)' })
  async createAnProduct_stag(@Body() createProductDto) {
    const { name, type, regular_price, description, short_description, categories, images } = createProductDto;
    return await this.productService.createAnProduct_stag(name, type, regular_price, description, short_description, categories, images);
  }

  @Public()
  @Get('stag/:product_id')
  @ApiOperation({ summary: '단일 상품 조회 API (스테이징)' })
  async retrieveAnProduct_stag(@Param() { product_id }: { product_id: string }) {
    return await this.productService.retrieveAnProduct_stag(product_id);
  }

  @Public()
  @Get('stag')
  @ApiOperation({ summary: '상품 리스트 조회 API (스테이징)' })
  async listAllProducts_stag(@Query() { page, size }: PageReqDto) {
    return await this.productService.listAllProducts_stag(page, size);
  }

  @Public()
  @Put('stag/:product_id')
  @ApiOperation({ summary: '단일 상품 갱신 API (스테이징)' })
  async updateAProduct_stag(@Param() { product_id }: { product_id: string }, @Body() data: any) {
    return await this.productService.updateAProduct_stag(product_id, data);
  }

  @Public()
  @Delete('stag/:product_id')
  @ApiOperation({ summary: '단일 상품 삭제 API (스테이징)' })
  async deleteAProduct_stag(@Param() { product_id }: { product_id: string }) {
    return await this.productService.deleteAProduct_stag(product_id);
  }

  // WooCommerce Production Product APIs
  @Public()
  @Post('prod')
  @ApiOperation({ summary: '단일 상품 생성 API (프로덕션)' })
  async createAnProduct_prod(@Body() createProductDto) {
    const { name, type, regular_price, description, short_description, categories, images } = createProductDto;
    return await this.productService.createAnProduct_prod(name, type, regular_price, description, short_description, categories, images);
  }

  @Public()
  @Get('prod/:product_id')
  @ApiOperation({ summary: '단일 상품 조회 API (프로덕션)' })
  async retrieveAnProduct_prod(@Param() { product_id }: { product_id: string }) {
    return await this.productService.retrieveAnProduct_prod(product_id);
  }

  @Public()
  @Get('prod')
  @ApiOperation({ summary: '상품 리스트 조회 API (프로덕션)' })
  async listAllProducts_prod(@Query() { page, size }: PageReqDto) {
    return await this.productService.listAllProducts_prod(page, size);
  }

  @Public()
  @Put('prod/:product_id')
  @ApiOperation({ summary: '단일 상품 갱신 API (프로덕션)' })
  async updateAProduct_prod(@Param() { product_id }: { product_id: string }, @Body() data: any) {
    return await this.productService.updateAProduct_prod(product_id, data);
  }

  @Public()
  @Delete('prod/:product_id')
  @ApiOperation({ summary: '단일 상품 삭제 API (프로덕션)' })
  async deleteAProduct_prod(@Param() { product_id }: { product_id: string }) {
    return await this.productService.deleteAProduct_prod(product_id);
  }
}
