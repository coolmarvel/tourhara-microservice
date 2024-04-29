import { ApiProperty } from '@nestjs/swagger';

export class SpecifiedProductCategoryReqDto {
  @ApiProperty({ required: true, example: 1 })
  type_id: number;
}

export class UpdateProductCategoryParamReqDto {
  @ApiProperty({ required: true, example: 1 })
  category_id: number;
}

export class UpdateProductCategoryBodyReqDto {
  @ApiProperty({ required: true, example: 1 })
  type_id: number;
}

export class GetProductsReqDto {
  @ApiProperty({ required: true, example: 1 })
  type_id: number;
}
