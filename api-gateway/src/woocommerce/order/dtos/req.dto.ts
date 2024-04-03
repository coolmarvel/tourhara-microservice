import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';

export class CreateOrderReqDto {
  @ApiProperty({ required: true, example: 'bacs' })
  payment_method: string;

  @ApiProperty({ required: true, example: 'Direct Bank Transfer' })
  payment_method_title: string;

  @ApiProperty({ required: true, example: false })
  set_paid: boolean;

  @ApiProperty({
    required: true,
    example: {
      first_name: 'Lee',
      last_name: 'SeongHyun',
      address_1: 'athometrip',
      address_2: 'tourhara',
      city: 'cat city',
      state: 'kyoungkido',
      postcode: '12345',
      country: 'Republic of Korea',
      email: 'seonghyunlee@athometrip.com',
      phone: '(+82) 0000-0000',
    },
  })
  billing: object;

  @ApiProperty({
    required: true,
    example: {
      first_name: 'Lee',
      last_name: 'SeongHyun',
      address_1: 'athometrip',
      address_2: 'tourhara',
      city: 'cat city',
      state: 'kyoungkido',
      postcode: '12345',
      country: 'Republic of Korea',
    },
  })
  shipping: object;

  @ApiProperty({
    required: true,
    example: [{ product_id: 21729, quantity: 2 }],
  })
  line_items: object;

  @ApiProperty({ required: true, example: [{ method_id: 'flat_rate', method_title: 'Flat Rate', total: '10.00' }] })
  shipping_lines: object;
}

export class RetrieveOrderReqDto {
  @ApiProperty({ required: true })
  @Transform((param) => Number(param.value))
  order_id: number;
}

export class UpdateOrderParamReqDto {
  @ApiProperty({ required: true })
  @Transform((param) => Number(param.value))
  order_id: number;
}

export class UpdateOrderBodyReqDto {
  @ApiProperty({ required: true, example: 'completed' })
  status: string;
}

export class DeleteOrderReqDto {
  @ApiProperty({ required: true })
  @Transform((param) => Number(param.value))
  order_id: number;
}

export class SynchronizeOrdereReqDto {
  @ApiProperty({ required: true, example: 1 })
  page_number: number;
}

// WEBHOOK DTO
export class OrderWebhookHeaderReqDto {
  @ApiProperty({ required: true })
  'x-wc-webhook-source': string;

  @ApiProperty({ required: true })
  'x-wc-webhook-topic': string;

  @ApiProperty({ required: true })
  'x-wc-webhook-resource': string;

  @ApiProperty({ required: true })
  'x-wc-webhook-event': string;

  @ApiProperty({ required: true })
  'x-wc-webhook-signature': string;

  @ApiProperty({ required: true })
  'x-wc-webhook-id': string;

  @ApiProperty({ required: true })
  'x-wc-delivery-id': string;
}

export class OrderCreatedBodyReqDto {}

export class ListAllOrdersReqDto {
  @ApiPropertyOptional({ description: '페이지. default = 1' })
  @Transform((param) => Number(param.value))
  @IsInt()
  page?: number = 1;

  @ApiPropertyOptional({ description: '페이지당 데이터 갯수. default = 10' })
  @Transform((param) => Number(param.value))
  @IsInt()
  size?: number = 10;

  @ApiPropertyOptional({ description: '날짜. default = 2018-08-20' })
  date?: string = '2018-08-20';
}
