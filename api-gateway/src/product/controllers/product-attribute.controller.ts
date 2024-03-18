import { Body, Controller, Delete, Get, Param, Post, Put, Query, VERSION_NEUTRAL } from '@nestjs/common';
import { ProductAttributeServcie } from '../services/product-attribute.service';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PageReqDto } from 'src/common/dtos/req.dto';
import { CreateProductAttributeReqDto, DeleteProductAttributeReqDto, RetrieveProductAttributeReqDto, UpdateProductAttributeBodyReqDto, UpdateProductAttributeParamReqDto } from '../dtos/req.dto';

@Controller({ path: 'api/product/attribute', version: VERSION_NEUTRAL })
export class ProductAttributeController {
  constructor(private readonly productAttributeService: ProductAttributeServcie) {}

  // WooCommerce Staging Product Category APIs
  @Public()
  @Post('stag')
  @ApiTags('Product-Attribute')
  @ApiOperation({ summary: '단일 상품 속성 생성 API (스테이징)' })
  async createAProductAttribute_stag(@Body() data: CreateProductAttributeReqDto) {
    return await this.productAttributeService.createAProductAttribute_stag(data);
  }

  @Public()
  @Get('stag/:attribute_id')
  @ApiTags('Product-Attribute')
  @ApiOperation({ summary: '단일 상품 속성 조회 API (스테이징)' })
  async retrieveAProductAttribute_stag(@Param() { attribute_id }: RetrieveProductAttributeReqDto) {
    return await this.productAttributeService.retrieveAProductAttribute_stag(attribute_id);
  }

  @Public()
  @Get('stag')
  @ApiTags('Product-Attribute')
  @ApiOperation({ summary: '상품 속성 리스트 조회 API (스테이징)' })
  async listAllProductAttributes_stag(@Query() { page, size }: PageReqDto) {
    return await this.productAttributeService.listAllProductAttributes_stag(page, size);
  }

  @Public()
  @Put('stag/:attribute_id')
  @ApiTags('Product-Attribute')
  @ApiOperation({ summary: '단일 상품 속성 갱신 API (스테이징)' })
  async updateAProductAttribute_stag(@Param() { attribute_id }: UpdateProductAttributeParamReqDto, @Body() data: UpdateProductAttributeBodyReqDto) {
    return await this.productAttributeService.updateAProductAttribute_stag(attribute_id, data);
  }

  @Public()
  @Delete('stag/:attribute_id')
  @ApiTags('Product-Attribute')
  @ApiOperation({ summary: '단일 상품 속성 삭제 API (스테이징)' })
  async deleteAProductAttribute_stag(@Param() { attribute_id }: DeleteProductAttributeReqDto) {
    return await this.productAttributeService.deleteAProductAttribute_stag(attribute_id);
  }

  // WooCommerce Production Product Category APIs
  @Public()
  @Post('prod')
  @ApiTags('Product-Attribute')
  @ApiOperation({ summary: '단일 상품 속성 생성 API (프로덕션)' })
  async createAProductAttribute_prod(@Body() data: CreateProductAttributeReqDto) {
    return await this.productAttributeService.createAProductAttribute_prod(data);
  }

  @Public()
  @Get('prod/:attribute_id')
  @ApiTags('Product-Attribute')
  @ApiOperation({ summary: '단일 상품 속성 조회 API (프로덕션)' })
  async retrieveAProductAttribute_prod(@Param() { attribute_id }: RetrieveProductAttributeReqDto) {
    return await this.productAttributeService.retrieveAProductAttribute_prod(attribute_id);
  }

  @Public()
  @Get('prod')
  @ApiTags('Product-Attribute')
  @ApiOperation({ summary: '상품 속성 리스트 조회 API (프로덕션)' })
  async listAllProductAttributes_prod(@Query() { page, size }: PageReqDto) {
    return await this.productAttributeService.listAllProductAttributes_prod(page, size);
  }

  @Public()
  @Put('prod/:attribute_id')
  @ApiTags('Product-Attribute')
  @ApiOperation({ summary: '단일 상품 속성 갱신 API (프로덕션)' })
  async updateAProductAttribute_prod(@Param() { attribute_id }: UpdateProductAttributeParamReqDto, @Body() data: UpdateProductAttributeBodyReqDto) {
    return await this.productAttributeService.updateAProductAttribute_prod(attribute_id, data);
  }

  @Public()
  @Delete('prod/:attribute_id')
  @ApiTags('Product-Attribute')
  @ApiOperation({ summary: '단일 상품 속성 삭제 API (프로덕션)' })
  async deleteAProductAttribute_prod(@Param() { attribute_id }: DeleteProductAttributeReqDto) {
    return await this.productAttributeService.deleteAProductAttribute_prod(attribute_id);
  }
}
