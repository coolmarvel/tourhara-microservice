import { Body, Controller, Delete, Get, Param, Post, Put, Headers, Query, VERSION_NEUTRAL, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { PageReqDto } from 'src/common/dtos/req.dto';
import { CreateProductReqDto, DeleteProductReqDto, RetrieveProductReqDto, UpdateProductBodyReqDto, UpdateProductParamReqDto } from 'src/woocommerce/product/dtos/req.dto';
import { ProductProductionService } from 'src/woocommerce/product/services/product/product-production.service';
import { WebhookHeaderReqDto } from '../../dtos/webhook-req.dto';

@ApiTags('WooCommerce-Product-Production')
@Controller({ path: 'api/product/production', version: VERSION_NEUTRAL })
export class ProductProductionController {
  constructor(private readonly productProductionService: ProductProductionService) {}

  /**
   * WooCommerce
   */
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

  /**
   * Synchronize
   */
  @Public()
  @Post('synchronize')
  @ApiOperation({ summary: '상품 데이터 동기화 (프로덕션)' })
  async synchronizeProduct() {
    return await this.productProductionService.synchronizeProduct();
  }

  /**
   * Webhook
   */
  @Public()
  @Post('webhook-created')
  @ApiOperation({ summary: '단일 상품 생성 WEBHOOK (프로덕션)' })
  async productCreated(@Headers() header: WebhookHeaderReqDto, @Body() data: any) {
    if (header['x-wc-webhook-topic'] !== 'product.created') return HttpStatus.NO_CONTENT;
    console.log(header);

    const result = await this.productProductionService.productCreated(data);

    if (result) return HttpStatus.OK;
    else return HttpStatus.BAD_REQUEST;
  }

  @Public()
  @Post('webhook-updated')
  @ApiOperation({ summary: '단일 상품 갱신 WEBHOOK (프로덕션)' })
  async productUpdated(@Headers() header: WebhookHeaderReqDto, @Body() data: any) {
    if (header['x-wc-webhook-topic'] !== 'product.updated') return HttpStatus.NO_CONTENT;
    console.log(header);

    const result = await this.productProductionService.productUpdated(data);
    if (result) return HttpStatus.OK;
  }

  @Public()
  @Post('webhook-deleted')
  @ApiOperation({ summary: '단일 상품 삭제 WEBHOOK (프로덕션)' })
  async productDeleted(@Headers() header: WebhookHeaderReqDto, @Body() data: any) {
    if (header['x-wc-webhook-topic'] !== 'product.deleted') return HttpStatus.NO_CONTENT;
    console.log(header);

    return await this.productProductionService.productDeleted(data);
  }

  @Public()
  @Post('webhook-restored')
  @ApiOperation({ summary: '단일 상품 복원 WEBHOOK (프로덕션)' })
  async productRestored(@Headers() header: WebhookHeaderReqDto, @Body() data: any) {
    if (header['x-wc-webhook-topic'] !== 'product.restored') return HttpStatus.NO_CONTENT;
    console.log(header);

    return await this.productProductionService.productRestored(data);
  }
}
