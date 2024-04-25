import { ApiProperty } from '@nestjs/swagger';

export class SpecifiedProductCategoryReqDto {
  @ApiProperty({ required: true, example: '' })
  product_type_id: string;
}

export class UpdateProductCategoryParamReqDto {
  @ApiProperty({ required: true, example: '' })
  product_category_id: string;
}

export class UpdateProductCategoryBodyReqDto {
  @ApiProperty({ required: true, example: '' })
  product_type_id: string;
}

export class GetProductsReqDto {
  @ApiProperty({ required: true, example: '' })
  product_type_id: string;
}
