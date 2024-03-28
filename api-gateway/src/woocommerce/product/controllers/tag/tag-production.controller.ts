import { Body, Controller, Delete, Get, Param, Post, Put, Query, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { PageReqDto } from 'src/common/dtos/req.dto';
import { CreateProductTagReqDto, DeleteProductTagReqDto, RetrieveProductTagReqDto, UpdateProductTagBodyReqDto, UpdateProductTagParamReqDto } from 'src/woocommerce/product/dtos/req.dto';
import { TagProductionService } from 'src/woocommerce/product/services/tag/tag-production.service';

@ApiTags('WooCommerce-Product-Tag-Production')
@Controller({ path: 'api/product/tag/production', version: VERSION_NEUTRAL })
export class TagProductionController {
  constructor(private readonly tagProductionService: TagProductionService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: '단일 태그 속성 생성 API (프로덕션)' })
  async createAProductTag(@Body() data: CreateProductTagReqDto) {
    return await this.tagProductionService.createAProductTag(data);
  }

  @Public()
  @Get(':tag_id')
  @ApiOperation({ summary: '단일 태그 속성 조회 API (프로덕션)' })
  async retrieveAProductTag(@Param() { tag_id }: RetrieveProductTagReqDto) {
    return await this.tagProductionService.retrieveAProductTag(tag_id);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: '태그 속성 리스트 조회 API (프로덕션)' })
  async listAllProductTags(@Query() { page, size }: PageReqDto) {
    return await this.tagProductionService.listAllProductTags(page, size);
  }

  @Public()
  @Put(':tag_id')
  @ApiOperation({ summary: '단일 태그 속성 갱신 API (프로덕션)' })
  async updateAProductTag(@Param() { tag_id }: UpdateProductTagParamReqDto, @Body() data: UpdateProductTagBodyReqDto) {
    return await this.tagProductionService.updateAProductTag(tag_id, data);
  }

  @Public()
  @Delete(':tag_id')
  @ApiOperation({ summary: '단일 태그 속성 삭제 API (프로덕션)' })
  async deleteAProductTag(@Param() { tag_id }: DeleteProductTagReqDto) {
    return await this.tagProductionService.deleteAProductTag(tag_id);
  }
}
