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
} from 'src/product/dtos/req.dto';
import { AttributeService } from '../services/attribute.service';

@ApiTags('Product-Attribute')
@Controller({ path: 'api/product/attribute', version: VERSION_NEUTRAL })
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: '단일 상품 속성 생성 API' })
  async createAProductAttribute(@Body() data: CreateProductAttributeReqDto) {
    return await this.attributeService.createAProductAttribute(data);
  }

  @Public()
  @Get(':attribute_id')
  @ApiOperation({ summary: '단일 상품 속성 조회 API' })
  async retrieveAProductAttribute(@Param() { attribute_id }: RetrieveProductAttributeReqDto) {
    return await this.attributeService.retrieveAProductAttribute(attribute_id);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: '상품 속성 리스트 조회 API' })
  async listAllProductAttributes(@Query() { page, size }: PageReqDto) {
    return await this.attributeService.listAllProductAttributes(page, size);
  }

  @Public()
  @Put(':attribute_id')
  @ApiOperation({ summary: '단일 상품 속성 갱신 API' })
  async updateAProductAttribute(@Param() { attribute_id }: UpdateProductAttributeParamReqDto, @Body() data: UpdateProductAttributeBodyReqDto) {
    return await this.attributeService.updateAProductAttribute(attribute_id, data);
  }

  @Public()
  @Delete(':attribute_id')
  @ApiOperation({ summary: '단일 상품 속성 삭제 API' })
  async deleteAProductAttribute(@Param() { attribute_id }: DeleteProductAttributeReqDto) {
    return await this.attributeService.deleteAProductAttribute(attribute_id);
  }
}
