import { Body, Controller, Delete, Get, Param, Post, Put, Query, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateProductReqDto, DeleteProductReqDto, RetrieveProductReqDto, UpdateProductBodyReqDto, UpdateProductParamReqDto } from '../dtos/req.dto';
import { ProductService } from '../services/product.service';
import { PageReqDto, Public } from '../../common';

@ApiTags('Product')
@Controller({ path: 'api/product', version: VERSION_NEUTRAL })
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: '단일 상품 생성 API' })
  async createAProduct(@Body() data: CreateProductReqDto) {
    return await this.productService.createAProduct(data);
  }

  @Public()
  @Get(':product_id')
  @ApiOperation({ summary: '단일 상품 조회 API' })
  async retrieveAProduct(@Param() { product_id }: RetrieveProductReqDto) {
    return await this.productService.retrieveAProduct(product_id);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: '상품 리스트 조회 API' })
  async listAllProducts(@Query() { page, size }: PageReqDto) {
    return await this.productService.listAllProducts(page, size);
  }

  @Public()
  @Put(':product_id')
  @ApiOperation({ summary: '단일 상품 갱신 API' })
  async updateAProduct(@Param() { product_id }: UpdateProductParamReqDto, @Body() data: UpdateProductBodyReqDto) {
    return await this.productService.updateAProduct(product_id, data);
  }

  @Public()
  @Delete(':product_id')
  @ApiOperation({ summary: '단일 상품 삭제 API' })
  async deleteAProduct(@Param() { product_id }: DeleteProductReqDto) {
    return await this.productService.deleteAProduct(product_id);
  }
}
