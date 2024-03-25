import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';

export class CreateProductReqDto {
  name: string;

  type: string;

  regular_price: string;

  description: string;

  short_description: string;

  categories: object;

  images: object;
}

export class RetrieveProductReqDto {
  product_id: string;
}

export class UpdateProductReqDto {
  product_id: string;

  data: any;
}

export class DeleteProductReqDto {
  product_id: string;
}

export class PageReqDto {
  @Transform((param) => Number(param.value))
  @IsInt()
  page?: number = 1;

  @Transform((param) => Number(param.value))
  @IsInt()
  size?: number = 10;
}
