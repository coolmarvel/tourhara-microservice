import { ApiProperty } from '@nestjs/swagger';

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
  order_id: string;
}

export class UpdateOrderParamReqDto {
  @ApiProperty({ required: true })
  order_id: string;
}

export class UpdateOrderBodyReqDto {
  @ApiProperty({ required: true, example: 'completed' })
  status: string;
}

export class DeleteOrderReqDto {
  @ApiProperty({ required: true })
  order_id: string;
}
