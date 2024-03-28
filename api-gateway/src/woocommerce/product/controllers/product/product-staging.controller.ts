import { Body, Controller, Delete, Get, Param, Post, Put, Query, Headers, VERSION_NEUTRAL, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { PageReqDto } from 'src/common/dtos/req.dto';
import { CreateProductReqDto, DeleteProductReqDto, RetrieveProductReqDto, UpdateProductBodyReqDto, UpdateProductParamReqDto } from 'src/woocommerce/product/dtos/req.dto';
import { ProductStagingService } from 'src/woocommerce/product/services/product/product-staging.service';

@ApiTags('WooCommerce-Product-Staging')
@Controller({ path: 'api/product/staging', version: VERSION_NEUTRAL })
export class ProductStagingController {
  constructor(private readonly productStagingService: ProductStagingService) {}

  /**
   * WooCommerce
   */
  @Public()
  @Post()
  @ApiOperation({ summary: '단일 상품 생성 API (스테이징)' })
  async createAProduct(@Body() data: CreateProductReqDto) {
    return await this.productStagingService.createAProduct(data);
  }

  @Public()
  @Get(':product_id')
  @ApiOperation({ summary: '단일 상품 조회 API (스테이징)' })
  async retrieveAProduct(@Param() { product_id }: RetrieveProductReqDto) {
    return await this.productStagingService.retrieveAProduct(product_id);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: '상품 리스트 조회 API (스테이징)' })
  async listAllProducts(@Query() { page, size }: PageReqDto) {
    return await this.productStagingService.listAllProducts(page, size);
  }

  @Public()
  @Put(':product_id')
  @ApiOperation({ summary: '단일 상품 갱신 API (스테이징)' })
  async updateAProduct(@Param() { product_id }: UpdateProductParamReqDto, @Body() data: UpdateProductBodyReqDto) {
    return await this.productStagingService.updateAProduct(product_id, data);
  }

  @Public()
  @Delete(':product_id')
  @ApiOperation({ summary: '단일 상품 삭제 API (스테이징)' })
  async deleteAProduct(@Param() { product_id }: DeleteProductReqDto) {
    return await this.productStagingService.deleteAProduct(product_id);
  }

  /**
   * Database
   */
  @Public()
  @Post('synchronize')
  @ApiOperation({ summary: '상품 데이터 동기화 (스테이징)' })
  async synchronizeProduct() {
    return await this.productStagingService.synchronizeProduct();
  }

  /**
   * Webhook
   */
  @Public()
  @Post('webhook-created')
  @ApiOperation({ summary: '단일 상품 생성 WEBHOOK (스테이징)' })
  async productCreated(@Headers() header: any, @Body() data: any) {
    console.log(header);

    const result = await this.productStagingService.productCreated(data);

    if (result) return HttpStatus.OK;
    else return HttpStatus.BAD_REQUEST;
  }

  @Public()
  @Post('webhook-updated')
  @ApiOperation({ summary: '단일 상품 갱신 WEBHOOK (스테이징)' })
  async productUpdated(@Headers() header: any, @Body() data: any) {
    console.log(header);
    if (header['x-wc-webhook-topic'] !== 'product.updated') return HttpStatus.NO_CONTENT;

    const result = await this.productStagingService.productUpdated(data);
    if (result) return HttpStatus.OK;
  }

  @Public()
  @Post('webhook-deleted')
  @ApiOperation({ summary: '단일 상품 삭제 WEBHOOK (스테이징)' })
  async productDeleted(@Headers() header: any, @Body() data: any) {
    console.log(header);

    return await this.productStagingService.productDeleted(data);
  }

  @Public()
  @Post('webhook-restored')
  @ApiOperation({ summary: '단일 상품 복원 WEBHOOK (스테이징)' })
  async productRestored(@Headers() header: any, @Body() data: any) {
    console.log(header);

    return await this.productStagingService.productRestored(data);
  }
}
