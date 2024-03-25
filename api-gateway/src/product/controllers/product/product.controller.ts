import { Body, Controller, Delete, Get, Param, Post, Put, Query, VERSION_NEUTRAL } from '@nestjs/common';
import { ProductService } from '../../services/product/product.service';
import { Public } from 'src/common/decorators/public.decorator';
import { PageReqDto } from 'src/common/dtos/req.dto';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProductReqDto, DeleteProductReqDto, RetrieveProductReqDto, UpdateProductBodyReqDto, UpdateProductParamReqDto } from '../../dtos/req.dto';

@ApiExtraModels()
@Controller({ path: 'api/product', version: VERSION_NEUTRAL })
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // WooCommerce Staging Product APIs
  @Public()
  @ApiTags('Product')
  @Post('stag')
  @ApiOperation({ summary: '단일 상품 생성 API (스테이징)' })
  async createAProduct_stag(@Body() data: CreateProductReqDto) {
    return await this.productService.createAProduct_stag(data);
  }

  @Public()
  @ApiTags('Product')
  @Get('stag/:product_id')
  @ApiOperation({ summary: '단일 상품 조회 API (스테이징)' })
  async retrieveAProduct_stag(@Param() { product_id }: RetrieveProductReqDto) {
    return await this.productService.retrieveAProduct_stag(product_id);
  }

  @Public()
  @ApiTags('Product')
  @Get('stag')
  @ApiOperation({ summary: '상품 리스트 조회 API (스테이징)' })
  async listAllProducts_stag(@Query() { page, size }: PageReqDto) {
    return await this.productService.listAllProducts_stag(page, size);
  }

  @Public()
  @ApiTags('Product')
  @Put('stag/:product_id')
  @ApiOperation({ summary: '단일 상품 갱신 API (스테이징)' })
  async updateAProduct_stag(@Param() { product_id }: UpdateProductParamReqDto, @Body() data: UpdateProductBodyReqDto) {
    return await this.productService.updateAProduct_stag(product_id, data);
  }

  @Public()
  @ApiTags('Product')
  @Delete('stag/:product_id')
  @ApiOperation({ summary: '단일 상품 삭제 API (스테이징)' })
  async deleteAProduct_stag(@Param() { product_id }: DeleteProductReqDto) {
    return await this.productService.deleteAProduct_stag(product_id);
  }

  // WooCommerce Production Product APIs
  @Public()
  @ApiTags('Product')
  @Post('prod')
  @ApiOperation({ summary: '단일 상품 생성 API (프로덕션)' })
  async createAProduct_prod(@Body() data: CreateProductReqDto) {
    return await this.productService.createAProduct_prod(data);
  }

  @Public()
  @ApiTags('Product')
  @Get('prod/:product_id')
  @ApiOperation({ summary: '단일 상품 조회 API (프로덕션)' })
  async retrieveAProduct_prod(@Param() { product_id }: RetrieveProductReqDto) {
    return await this.productService.retrieveAProduct_prod(product_id);
  }

  @Public()
  @ApiTags('Product')
  @Get('prod')
  @ApiOperation({ summary: '상품 리스트 조회 API (프로덕션)' })
  async listAllProducts_prod(@Query() { page, size }: PageReqDto) {
    return await this.productService.listAllProducts_prod(page, size);
  }

  @Public()
  @ApiTags('Product')
  @Put('prod/:product_id')
  @ApiOperation({ summary: '단일 상품 갱신 API (프로덕션)' })
  async updateAProduct_prod(@Param() { product_id }: UpdateProductParamReqDto, @Body() data: UpdateProductBodyReqDto) {
    return await this.productService.updateAProduct_prod(product_id, data);
  }

  @Public()
  @ApiTags('Product')
  @Delete('prod/:product_id')
  @ApiOperation({ summary: '단일 상품 삭제 API (프로덕션)' })
  async deleteAProduct_prod(@Param() { product_id }: DeleteProductReqDto) {
    return await this.productService.deleteAProduct_prod(product_id);
  }

  // TEST synchronizeProduct
  @Public()
  @ApiTags('Database-Product')
  @Post('stag/synchronize-database')
  async synchronizeProduct_stag() {
    return await this.productService.synchronizeProduct_stag();
  }

  @Public()
  @ApiTags('Database-Product')
  @Post('prod/synchronize-database')
  async synchronizeProduct_prod() {
    return await this.productService.synchronizeProduct_prod();
  }
}
