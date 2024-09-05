import { Controller, Get, Put, Query, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Public } from '../../common';
import { GetOrdersReqDto } from '../dtos/req.dto';
import { AdapterService } from '../services/adapter.service';

@ApiTags('Adapter')
@Controller({ path: 'api/adapter', version: VERSION_NEUTRAL })
export class AdapterController {
  constructor(private readonly adapterService: AdapterService) {}

  @Public()
  @Get('orders')
  @ApiOperation({ summary: '주문 리스트 조회 API' })
  async getOrders(@Query() { product_id, after, before }: GetOrdersReqDto) {
    return await this.adapterService.getOrders(product_id, after, before);
  }

  @Public()
  @Put('order')
  @ApiOperation({ summary: '주문 리스트 조회 API' })
  async updateOrder(@Query() { order_id, double_check, memo }) {
    return await this.adapterService.updateOrder(order_id, double_check === 'undefined' ? undefined : !!double_check, memo === 'undefined' ? undefined : decodeURI(memo));
  }
}
