import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

// Product
export class CreateProductReqDto {
  @ApiProperty({ required: true, example: 'Premium Quality' })
  name: string;

  @ApiProperty({ required: true, example: 'simple' })
  type: string;

  @ApiProperty({ required: true, example: '21.99' })
  regular_price: string;

  @ApiProperty({ required: true, example: 'description' })
  description: string;

  @ApiProperty({ required: true, example: 'short description' })
  short_description: string;

  @ApiProperty({ required: true, example: [{ id: 9 }, { id: 14 }] })
  categories: object;

  @ApiProperty({ required: true, example: [{ src: 'http://localhost:3000' }, { src: 'http://localhost:3000' }] })
  images: object;
}

export class RetrieveProductReqDto {
  @ApiProperty({ required: true })
  product_id: string;
}

export class UpdateProductParamReqDto {
  @ApiProperty({ required: true })
  product_id: string;
}

export class UpdateProductBodyReqDto {
  @ApiProperty({ required: true, example: '24.54' })
  regular_price: string;
}

export class DeleteProductReqDto {
  @ApiProperty({ required: true })
  product_id: string;
}

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

export class UpdateProductCategoryParamReqDto {
  @ApiProperty({ required: true })
  category_id: string;
}

export class UpdateProductCategoryBodyReqDto {
  @ApiProperty({ required: true, example: 'All kinds of clothes' })
  description: string;
}

export class DeleteProductCateogryReqDto {
  @ApiProperty({ required: true })
  category_id: string;
}

// Product Tag
export class CreateProductTagReqDto {
  @ApiProperty({ required: true, example: 'Leather Shoes' })
  name: string;
}

export class RetrieveProductTagReqDto {
  @ApiProperty({ required: true })
  tag_id: string;
}

export class UpdateProductTagParamReqDto {
  @ApiProperty({ required: true })
  tag_id: string;
}

export class UpdateProductTagBodyReqDto {
  @ApiProperty({ required: true, example: 'Genuine Leather.' })
  description: string;
}

export class DeleteProductTagReqDto {
  @ApiProperty({ required: true })
  tag_id: string;
}

// Product Attribute
export class CreateProductAttributeReqDto {
  @ApiProperty({ required: true, example: 'Color' })
  name: string;

  @ApiProperty({ required: true, example: 'pa_color' })
  slug: string;

  @ApiProperty({ required: true, example: 'select' })
  type: string;

  @ApiProperty({ required: true, example: 'menu_order' })
  order_by: string;

  @ApiProperty({ required: true, example: true })
  has_archives: boolean;
}

export class RetrieveProductAttributeReqDto {
  @ApiProperty({ required: true })
  @Transform((param) => Number(param.value))
  attribute_id: number;
}

export class UpdateProductAttributeParamReqDto {
  @ApiProperty({ required: true })
  @Transform((param) => Number(param.value))
  attribute_id: number;
}

export class UpdateProductAttributeBodyReqDto {
  @ApiProperty({ required: true, example: 'name' })
  order_by: string;
}

export class DeleteProductAttributeReqDto {
  @ApiProperty({ required: true })
  @Transform((param) => Number(param.value))
  attribute_id: number;
}
