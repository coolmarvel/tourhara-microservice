import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class SpecifiedProductCategoryReqDto {
  @ApiProperty({ required: true, example: 1 })
  @Transform((param) => parseInt(param.value, 10))
  type_id: number;
}

export class UpdateProductCategoryParamReqDto {
  @ApiProperty({ required: true, example: 1 })
  @Transform((param) => parseInt(param.value, 10))
  type_id: number;
}

export class UpdateProductCategoryBodyReqDto {
  @ApiProperty({ required: true, example: 1 })
  @Transform((param) => parseInt(param.value, 10))
  category_id: number;
}

export class GetProductsReqDto {
  @ApiProperty({ required: true, example: 1 })
  @Transform((param) => parseInt(param.value, 10))
  type_id: number;
}

export class GetOrdersReqDto {
  @ApiProperty({ required: true, example: 1 })
  @Transform((param) => parseInt(param.value, 10))
  type_id: number;

  @ApiProperty({ required: true, example: 1 })
  @Transform((param) => parseInt(param.value, 10))
  category_id: number;
}
