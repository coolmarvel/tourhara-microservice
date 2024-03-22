import { Body, Controller, Post, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { ProductCategoryWebhookService } from 'src/product/services/category/product-category-webhook.service';

@Controller({ path: 'api/product/category/webhook', version: VERSION_NEUTRAL })
export class ProductCategoryWebhookController {
  constructor(private readonly productCategoryWebhookService: ProductCategoryWebhookService) {}

  @Public()
  @ApiTags('Product-Category-Webhook')
  @Post('stag/created')
  @ApiOperation({ summary: '단일 상품 카테고리 생성 WEBHOOK (스테이징)' })
  async productCategoryCreated_stag(@Body() data: any) {
    return await this.productCategoryWebhookService.productCategoryCreated_stag(data);
  }

  @Public()
  @ApiTags('Product-Category-Webhook')
  @Post('stag/updated')
  @ApiOperation({ summary: '단일 상품 카테고리 갱신 WEBHOOK (스테이징)' })
  async productCategoryUpdated_stag(@Body() data: any) {
    return await this.productCategoryWebhookService.productCategoryUpdated_stag(data);
  }

  @Public()
  @ApiTags('Product-Category-Webhook')
  @Post('stag/deleted')
  @ApiOperation({ summary: '단일 상품 카테고리 삭제 WEBHOOK (스테이징)' })
  async productCategoryDeleted_stag(@Body() data: any) {
    return await this.productCategoryWebhookService.productCategoryDeleted_stag(data);
  }

  @Public()
  @ApiTags('Product-Category-Webhook')
  @Post('stag/restored')
  @ApiOperation({ summary: '단일 상품 카테고리 복원 WEBHOOK (스테이징)' })
  async productCategoryRestored_stag(@Body() data: any) {
    return await this.productCategoryWebhookService.productCategoryRestored_stag(data);
  }

  @Public()
  @ApiTags('Product-Category-Webhook')
  @Post('prod/created')
  @ApiOperation({ summary: '단일 상품 카테고리 생성 WEBHOOK (프로덕션)' })
  async productCategoryCreated_prod(@Body() data: any) {
    return await this.productCategoryWebhookService.productCategoryCreated_prod(data);
  }

  @Public()
  @ApiTags('Product-Category-Webhook')
  @Post('prod/updated')
  @ApiOperation({ summary: '단일 상품 카테고리 갱신 WEBHOOK (프로덕션)' })
  async productCategoryUpdated_prod(@Body() data: any) {
    return await this.productCategoryWebhookService.productCategoryUpdated_prod(data);
  }

  @Public()
  @ApiTags('Product-Category-Webhook')
  @Post('prod/deleted')
  @ApiOperation({ summary: '단일 상품 카테고리 삭제 WEBHOOK (프로덕션)' })
  async productCategoryDeleted_prod(@Body() data: any) {
    return await this.productCategoryWebhookService.productCategoryDeleted_prod(data);
  }

  @Public()
  @ApiTags('Product-Category-Webhook')
  @Post('prod/restored')
  @ApiOperation({ summary: '단일 상품 카테고리 복원 WEBHOOK (프로덕션)' })
  async productCategoryRestored_prod(@Body() data: any) {
    return await this.productCategoryWebhookService.productCategoryRestored_prod(data);
  }
}
