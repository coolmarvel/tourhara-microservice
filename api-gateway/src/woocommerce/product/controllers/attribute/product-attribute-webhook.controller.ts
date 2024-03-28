import { Body, Controller, Post, Headers, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { ProductAttributeWebhookService } from 'src/woocommerce/product/services/attribute/product-attribute-webhook.service';

@Controller({ path: 'api/product/attribute/webhook', version: VERSION_NEUTRAL })
export class ProductAttributeWebhookController {
  constructor(private readonly productAttributeWebhookService: ProductAttributeWebhookService) {}

  @Public()
  @ApiTags('Product-Attribute-Webhook')
  @Post('stag/created')
  @ApiOperation({ summary: '단일 상품 속성 생성 WEBHOOK (스테이징)' })
  async productAttributeCreated_stag(@Headers() header: any, @Body() data: any) {
    console.log(header);

    return await this.productAttributeWebhookService.productAttributeCreated_stag(data);
  }

  @Public()
  @ApiTags('Product-Attribute-Webhook')
  @Post('stag/updated')
  @ApiOperation({ summary: '단일 상품 속성 갱신 WEBHOOK (스테이징)' })
  async productAttributeUpdated_stag(@Headers() header: any, @Body() data: any) {
    console.log(header);

    return await this.productAttributeWebhookService.productAttributeUpdated_stag(data);
  }

  @Public()
  @ApiTags('Product-Attribute-Webhook')
  @Post('stag/deleted')
  @ApiOperation({ summary: '단일 상품 속성 삭제 WEBHOOK (스테이징)' })
  async productAttributeDeleted_stag(@Headers() header: any, @Body() data: any) {
    console.log(header);

    return await this.productAttributeWebhookService.productAttributeDeleted_stag(data);
  }

  @Public()
  @ApiTags('Product-Attribute-Webhook')
  @Post('stag/restored')
  @ApiOperation({ summary: '단일 상품 속성 복원 WEBHOOK (스테이징)' })
  async productAttributeRestored_stag(@Headers() header: any, @Body() data: any) {
    console.log(header);

    return await this.productAttributeWebhookService.productAttributeRestored_stag(data);
  }

  @Public()
  @ApiTags('Product-Attribute-Webhook')
  @Post('prod/created')
  @ApiOperation({ summary: '단일 상품 속성 생성 WEBHOOK (프로덕션)' })
  async productAttributeCreated_prod(@Headers() header: any, @Body() data: any) {
    return await this.productAttributeWebhookService.productAttributeCreated_prod(data);
  }

  @Public()
  @ApiTags('Product-Attribute-Webhook')
  @Post('prod/updated')
  @ApiOperation({ summary: '단일 상품 속성 갱신 WEBHOOK (프로덕션)' })
  async productAttributeUpdated_prod(@Headers() header: any, @Body() data: any) {
    console.log(header);

    return await this.productAttributeWebhookService.productAttributeUpdated_prod(data);
  }

  @Public()
  @ApiTags('Product-Attribute-Webhook')
  @Post('prod/deleted')
  @ApiOperation({ summary: '단일 상품 속성 삭제 WEBHOOK (프로덕션)' })
  async productAttributeDeleted_prod(@Headers() header: any, @Body() data: any) {
    console.log(header);

    return await this.productAttributeWebhookService.productAttributeDeleted_prod(data);
  }

  @Public()
  @ApiTags('Product-Attribute-Webhook')
  @Post('prod/restored')
  @ApiOperation({ summary: '단일 상품 속성 복원 WEBHOOK (프로덕션)' })
  async productAttributeRestored_prod(@Headers() header: any, @Body() data: any) {
    console.log(header);

    return await this.productAttributeWebhookService.productAttributeRestored_prod(data);
  }
}
