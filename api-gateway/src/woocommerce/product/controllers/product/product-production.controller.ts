import { Body, Controller, Delete, Get, Param, Post, Put, Query, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { PageReqDto } from 'src/common/dtos/req.dto';
import { CreateProductReqDto, DeleteProductReqDto, RetrieveProductReqDto, UpdateProductBodyReqDto, UpdateProductParamReqDto } from 'src/woocommerce/product/dtos/req.dto';
import { ProductProductionService } from 'src/woocommerce/product/services/product/product-production.service';

@ApiTags('WooCommerce-Product-Production')
@Controller({ path: 'api/product/production', version: VERSION_NEUTRAL })
export class ProductProductionController {
  constructor(private readonly productProductionService: ProductProductionService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: '단일 상품 생성 API (프로덕션)' })
  async createAProduct(@Body() data: CreateProductReqDto) {
    return await this.productProductionService.createAProduct(data);
  }

  @Public()
  @Get(':product_id')
  @ApiOperation({ summary: '단일 상품 조회 API (프로덕션)' })
  async retrieveAProduct(@Param() { product_id }: RetrieveProductReqDto) {
    return await this.productProductionService.retrieveAProduct(product_id);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: '상품 리스트 조회 API (프로덕션)' })
  async listAllProducts(@Query() { page, size }: PageReqDto) {
    return await this.productProductionService.listAllProducts(page, size);
  }

  @Public()
  @Put(':product_id')
  @ApiOperation({ summary: '단일 상품 갱신 API (프로덕션)' })
  async updateAProduct(@Param() { product_id }: UpdateProductParamReqDto, @Body() data: UpdateProductBodyReqDto) {
    return await this.productProductionService.updateAProduct(product_id, data);
  }

  @Public()
  @Delete(':product_id')
  @ApiOperation({ summary: '단일 상품 삭제 API (프로덕션)' })
  async deleteAProduct(@Param() { product_id }: DeleteProductReqDto) {
    return await this.productProductionService.deleteAProduct(product_id);
  }

  @Public()
  @Post('synchronize')
  @ApiOperation({ summary: '상품 데이터 동기화 (프로덕션)' })
  async synchronizeProduct() {
    return await this.productProductionService.synchronizeProduct();
  }
}
