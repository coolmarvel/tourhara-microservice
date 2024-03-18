import { ApiProperty } from '@nestjs/swagger';

export class CreateProductCategoryReqDto {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true, example: { src: 'http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_2_front.jpg' } })
  image: object;
}

export class RetrieveProductCategoryReqDto {
  @ApiProperty({ required: true })
  category_id: string;
}

export class UpdateProductCategoryReqDto {
  @ApiProperty({ required: true })
  category_id: string;

  @ApiProperty({ required: true, example: { description: 'All kinds of clothes' } })
  data: object;
}

export class DeleteProductCateogryReqDto {
  @ApiProperty({ required: true })
  category_id: string;
}
