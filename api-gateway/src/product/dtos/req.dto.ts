import { ApiProperty } from '@nestjs/swagger';

// Product Category
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

// Product Tag
export class CreateProductTagReqDto {
  @ApiProperty({ required: true, example: { name: 'Leather Shoes' } })
  data: object;
}

export class RetrieveProductTagReqDto {
  @ApiProperty({ required: true })
  tag_id: string;
}

export class UpdateProductTagReqDto {
  @ApiProperty({ required: true })
  tag_id: string;

  @ApiProperty({ required: true, example: { description: 'Genuine Leather.' } })
  data: object;
}

export class DeleteProductTagReqDto {
  @ApiProperty({ required: true })
  tag_id: string;
}

// Product Attribute
export class CreateProductAttributeReqDto {
  @ApiProperty({ required: true, example: { name: 'Color', slug: 'pa_color', type: 'select', order_by: 'menu_order', has_archives: true } })
  data: object;
}

export class RetrieveProductAttributeReqDto {
  @ApiProperty({ required: true })
  attribute_id: string;
}

export class UpdateProductAttributeReqDto {
  @ApiProperty({ required: true })
  attribute_id: string;

  @ApiProperty({ required: true, example: { order_by: 'name' } })
  data: object;
}

export class DeleteProductAttributeReqDto {
  @ApiProperty({ required: true })
  attribute_id: string;
}
