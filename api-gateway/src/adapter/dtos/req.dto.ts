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
