import { Body, Controller, Delete, Get, Param, Post, Put, Query, VERSION_NEUTRAL } from '@nestjs/common';
import { ProductTagService } from '../../services/product-tag.service';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PageReqDto } from 'src/common/dtos/req.dto';
import { CreateProductTagReqDto, DeleteProductTagReqDto, RetrieveProductTagReqDto, UpdateProductTagBodyReqDto, UpdateProductTagParamReqDto } from '../../dtos/req.dto';

@Controller({ path: 'api/product/tag', version: VERSION_NEUTRAL })
export class ProductTagController {
  constructor(private readonly productTagService: ProductTagService) {}

  // WooCommerce Staging Product Category APIs
  @Public()
  @Post('stag')
  @ApiTags('Product-Tag')
  @ApiOperation({ summary: '단일 상품 태그 생성 API (스테이징)' })
  async createAProductTag_stag(@Body() data: CreateProductTagReqDto) {
    return await this.productTagService.createAProductTag_stag(data);
  }

  @Public()
  @Get('stag/:tag_id')
  @ApiTags('Product-Tag')
  @ApiOperation({ summary: '단일 상품 태그 조회 API (스테이징)' })
  async retrieveAProductTag_stag(@Param() { tag_id }: RetrieveProductTagReqDto) {
    return await this.productTagService.retrieveAProductTag_stag(tag_id);
  }

  @Public()
  @Get('stag')
  @ApiTags('Product-Tag')
  @ApiOperation({ summary: '상품 태그 리스트 조회 API (스테이징)' })
  async listAllProductTags_stag(@Query() { page, size }: PageReqDto) {
    return await this.productTagService.listAllProductTags_stag(page, size);
  }

  @Public()
  @Put('stag/:tag_id')
  @ApiTags('Product-Tag')
  @ApiOperation({ summary: '단일 상품 태그 갱신 API (스테이징)' })
  async updateAProductTag_stag(@Param() { tag_id }: UpdateProductTagParamReqDto, @Body() data: UpdateProductTagBodyReqDto) {
    return await this.productTagService.updateAProductTag_stag(tag_id, data);
  }

  @Public()
  @Delete('stag/:tag_id')
  @ApiTags('Product-Tag')
  @ApiOperation({ summary: '단일 상품 태그 삭제 API (스테이징)' })
  async deleteAProductTag_stag(@Param() { tag_id }: DeleteProductTagReqDto) {
    return await this.productTagService.deleteAProductTag_stag(tag_id);
  }

  // WooCommerce Production Product Category APIs
  @Public()
  @Post('prod')
  @ApiTags('Product-Tag')
  @ApiOperation({ summary: '단일 상품 태그 생성 API (프로덕션)' })
  async createAProductTag_prod(@Body() data: CreateProductTagReqDto) {
    return await this.productTagService.createAProductTag_prod(data);
  }

  @Public()
  @Get('prod/:tag_id')
  @ApiTags('Product-Tag')
  @ApiOperation({ summary: '단일 상품 태그 조회 API (프로덕션)' })
  async retrieveAProductTag_prod(@Param() { tag_id }: RetrieveProductTagReqDto) {
    return await this.productTagService.retrieveAProductTag_prod(tag_id);
  }

  @Public()
  @Get('prod')
  @ApiTags('Product-Tag')
  @ApiOperation({ summary: '상품 태그 리스트 조회 API (프로덕션)' })
  async listAllProductTags_prod(@Query() { page, size }: PageReqDto) {
    return await this.productTagService.listAllProductTags_prod(page, size);
  }

  @Public()
  @Put('prod/:tag_id')
  @ApiTags('Product-Tag')
  @ApiOperation({ summary: '단일 상품 태그 갱신 API (프로덕션)' })
  async updateAProductTag_prod(@Param() { tag_id }: UpdateProductTagParamReqDto, @Body() data: UpdateProductTagBodyReqDto) {
    return await this.productTagService.updateAProductTag_prod(tag_id, data);
  }

  @Public()
  @Delete('prod/:tag_id')
  @ApiTags('Product-Tag')
  @ApiOperation({ summary: '단일 상품 태그 삭제 API (프로덕션)' })
  async deleteAProductTag_prod(@Param() { tag_id }: DeleteProductTagReqDto) {
    return await this.productTagService.deleteAProductTag_prod(tag_id);
  }

  //
  @Public()
  @Post('prod/insert-database')
  @ApiTags('Database-Product-Tag')
  async insertProductTag_prod() {
    return await this.productTagService.insertProductTag_prod();
  }
}
