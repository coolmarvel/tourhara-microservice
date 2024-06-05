import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class DeclaredCategoryReqDto {
  @ApiProperty({ required: true, example: 1 })
  @Transform((param) => parseInt(param.value, 10))
  type_id: number;
}

export class UpdateCategoryParamReqDto {
  @ApiProperty({ required: true, example: 1 })
  @Transform((param) => parseInt(param.value, 10))
  type_id: number;
}

export class UpdateCategoryBodyReqDto {
  @ApiProperty({ required: true, example: 1 })
  @Transform((param) => parseInt(param.value, 10))
  category_id: number;
}

export class AdaptedOrdersReqDto {
  @ApiProperty({ required: true, example: 1 })
  @Transform((param) => parseInt(param.value, 10))
  type_id: number;

  @ApiProperty({ required: true, example: 1 })
  @Transform((param) => parseInt(param.value, 10))
  category_id: number;
}

export class GetOrdersReqDto {
  @ApiProperty({ required: true, example: '써밋 전망대' })
  product_name: string;

  @ApiProperty({ required: true, example: '2024-04-30' })
  start_date: string;

  @ApiProperty({ required: true, example: '2024-05-30' })
  end_date: string;
}

export class GetOrdersByCategoryReqDto {
  @ApiProperty({ required: true, example: 103 })
  @Transform((param) => parseInt(param.value, 10))
  category_id: number;

  @ApiProperty({ required: true, example: '2024-05-01' })
  after: string;

  @ApiProperty({ required: true, example: '2024-05-31' })
  before: string;
}
