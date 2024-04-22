import { Body, Controller, Delete, Get, Headers, HttpStatus, Param, Post, Put, Query, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { PageReqDto } from 'src/common/dtos/req.dto';
import { CreateProductReqDto, DeleteProductReqDto, RetrieveProductReqDto, UpdateProductBodyReqDto, UpdateProductParamReqDto } from 'src/product/dtos/req.dto';
import { WebhookHeaderReqDto } from 'src/product/dtos/webhook-req.dto';
import { ProductProductionService } from 'src/product/services/production/product.production.service';

@ApiTags('(Production) Product')
@Controller({ path: 'api/production/product', version: VERSION_NEUTRAL })
export class ProductProductionController {
  constructor(private readonly productService: ProductProductionService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: '단일 상품 생성 API (프로덕션)' })
  async createAProduct(@Body() data: CreateProductReqDto) {
    return await this.productService.createAProduct(data);
  }

  @Public()
  @Get(':product_id')
  @ApiOperation({ summary: '단일 상품 조회 API (프로덕션)' })
  async retrieveAProduct(@Param() { product_id }: RetrieveProductReqDto) {
    return await this.productService.retrieveAProduct(product_id);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: '상품 리스트 조회 API (프로덕션)' })
  async listAllProducts(@Query() { page, size }: PageReqDto) {
    return await this.productService.listAllProducts(page, size);
  }

  @Public()
  @Put(':product_id')
  @ApiOperation({ summary: '단일 상품 갱신 API (프로덕션)' })
  async updateAProduct(@Param() { product_id }: UpdateProductParamReqDto, @Body() data: UpdateProductBodyReqDto) {
    return await this.productService.updateAProduct(product_id, data);
  }

  @Public()
  @Delete(':product_id')
  @ApiOperation({ summary: '단일 상품 삭제 API (프로덕션)' })
  async deleteAProduct(@Param() { product_id }: DeleteProductReqDto) {
    return await this.productService.deleteAProduct(product_id);
  }

  @Public()
  @Post('created')
  @ApiOperation({ summary: '단일 상품 생성 WEBHOOK (프로덕션)' })
  async productCreated(@Headers() header: WebhookHeaderReqDto, @Body() data: any) {
    if (header['x-wc-webhook-topic'] !== 'product.created') return HttpStatus.OK;
    console.log(header);

    const result = await this.productService.productCreated(data);

    if (result) return HttpStatus.OK;
    else return HttpStatus.BAD_REQUEST;
  }

  @Public()
  @Post('updated')
  @ApiOperation({ summary: '단일 상품 갱신 WEBHOOK (프로덕션)' })
  async productUpdated(@Headers() header: WebhookHeaderReqDto, @Body() data: any) {
    if (header['x-wc-webhook-topic'] !== 'product.updated') return HttpStatus.OK;
    console.log(header);

    const result = await this.productService.productUpdated(data);
    if (result) return HttpStatus.OK;
  }

  @Public()
  @Post('deleted')
  @ApiOperation({ summary: '단일 상품 삭제 WEBHOOK (프로덕션)' })
  async productDeleted(@Headers() header: WebhookHeaderReqDto, @Body() data: any) {
    if (header['x-wc-webhook-topic'] !== 'product.deleted') return HttpStatus.OK;
    console.log(header);

    return await this.productService.productDeleted(data);
  }

  @Public()
  @Post('restored')
  @ApiOperation({ summary: '단일 상품 복원 WEBHOOK (프로덕션)' })
  async productRestored(@Headers() header: WebhookHeaderReqDto, @Body() data: any) {
    if (header['x-wc-webhook-topic'] !== 'product.restored') return HttpStatus.OK;
    console.log(header);

    return await this.productService.productRestored(data);
  }
}
