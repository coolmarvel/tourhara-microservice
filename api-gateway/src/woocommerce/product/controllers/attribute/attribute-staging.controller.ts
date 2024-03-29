import { Body, Controller, Delete, Get, Param, Post, Put, Query, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { PageReqDto } from 'src/common/dtos/req.dto';
import {
  CreateProductAttributeReqDto,
  DeleteProductAttributeReqDto,
  RetrieveProductAttributeReqDto,
  UpdateProductAttributeBodyReqDto,
  UpdateProductAttributeParamReqDto,
} from 'src/woocommerce/product/dtos/req.dto';
import { AttributeStagingService } from 'src/woocommerce/product/services/attribute/attribute-staging.service';

@ApiTags('WooCommerce-Product-Attribute-Staging')
@Controller({ path: 'api/product/attribute/staging', version: VERSION_NEUTRAL })
export class AttributeStagingController {
  constructor(private readonly attributeStagingService: AttributeStagingService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: '단일 상품 속성 생성 API (스테이징)' })
  async createAProductAttribute(@Body() data: CreateProductAttributeReqDto) {
    return await this.attributeStagingService.createAProductAttribute(data);
  }

  @Public()
  @Get(':attribute_id')
  @ApiOperation({ summary: '단일 상품 속성 조회 API (스테이징)' })
  async retrieveAProductAttribute(@Param() { attribute_id }: RetrieveProductAttributeReqDto) {
    return await this.attributeStagingService.retrieveAProductAttribute(attribute_id);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: '상품 속성 리스트 조회 API (스테이징)' })
  async listAllProductAttributes(@Query() { page, size }: PageReqDto) {
    return await this.attributeStagingService.listAllProductAttributes(page, size);
  }

  @Public()
  @Put(':attribute_id')
  @ApiOperation({ summary: '단일 상품 속성 갱신 API (스테이징)' })
  async updateAProductAttribute(@Param() { attribute_id }: UpdateProductAttributeParamReqDto, @Body() data: UpdateProductAttributeBodyReqDto) {
    return await this.attributeStagingService.updateAProductAttribute(attribute_id, data);
  }

  @Public()
  @Delete(':attribute_id')
  @ApiOperation({ summary: '단일 상품 속성 삭제 API (스테이징)' })
  async deleteAProductAttribute(@Param() { attribute_id }: DeleteProductAttributeReqDto) {
    return await this.attributeStagingService.deleteAProductAttribute(attribute_id);
  }
}
