import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateOrderReqDto {
  @ApiProperty({ required: true })
  payment: object;

  @ApiProperty({ required: true })
  billing: object;

  @ApiProperty({ required: true })
  shipping: object;

  @ApiProperty({ required: true })
  line_items: object;

  @ApiProperty({ required: true })
  shipping_lines: object;
}

export class RetrieveOrderReqDto {
  @ApiProperty({ required: true })
  @Transform((param) => String(param.value))
  order_id: string;
}

export class ListOrdersReqDto {}

export class UpdateOrderReqDto {
  @ApiProperty({ required: true })
  order_id: string;

  @ApiProperty({ required: true })
  data: any;
}

export class DeleteOrderReqDto {
  @ApiProperty({ required: true })
  order_id: string;
}
