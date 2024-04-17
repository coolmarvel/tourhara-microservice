import { Body, Controller, Delete, Get, Param, Post, Put, Query, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { PageReqDto } from 'src/common/dtos/req.dto';
import { CreateProductTagReqDto, DeleteProductTagReqDto, RetrieveProductTagReqDto, UpdateProductTagBodyReqDto, UpdateProductTagParamReqDto } from 'src/product/dtos/req.dto';
import { TagStagingService } from 'src/product/services/staging/tag.staging.service';

@ApiTags('(Staging) Product-Tag')
@Controller({ path: 'api/staging/product/tag', version: VERSION_NEUTRAL })
export class TagStagingController {
  constructor(private readonly tagService: TagStagingService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: '단일 태그 속성 생성 API (스테이징)' })
  async createAProductTag(@Body() data: CreateProductTagReqDto) {
    return await this.tagService.createAProductTag(data);
  }

  @Public()
  @Get(':tag_id')
  @ApiOperation({ summary: '단일 태그 속성 조회 API (스테이징)' })
  async retrieveAProductTag(@Param() { tag_id }: RetrieveProductTagReqDto) {
    return await this.tagService.retrieveAProductTag(tag_id);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: '태그 속성 리스트 조회 API (스테이징)' })
  async listAllProductTags(@Query() { page, size }: PageReqDto) {
    return await this.tagService.listAllProductTags(page, size);
  }

  @Public()
  @Put(':tag_id')
  @ApiOperation({ summary: '단일 태그 속성 갱신 API (스테이징)' })
  async updateAProductTag(@Param() { tag_id }: UpdateProductTagParamReqDto, @Body() data: UpdateProductTagBodyReqDto) {
    return await this.tagService.updateAProductTag(tag_id, data);
  }

  @Public()
  @Delete(':tag_id')
  @ApiOperation({ summary: '단일 태그 속성 삭제 API (스테이징)' })
  async deleteAProductTag(@Param() { tag_id }: DeleteProductTagReqDto) {
    return await this.tagService.deleteAProductTag(tag_id);
  }
}
