import { Controller, Get, Query, VERSION_NEUTRAL } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { Public } from 'src/common/decorators/public.decorator';
import { PageReqDto } from 'src/common/dtos/req.dto';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
@ApiExtraModels()
@Controller({ path: 'api/product', version: VERSION_NEUTRAL })
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // WooCommerce Staging Product APIs

  // WooCommerce Production Product APIs
  @Public()
  @Get('prod')
  @ApiOperation({ summary: '상품 리스트 조회 API (프로덕션)' })
  async listAllProducts_prod(@Query() { page, size }: PageReqDto) {
    return await this.productService.listAllProducts_prod(page, size);
  }
}
