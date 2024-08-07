import { Transform } from 'class-transformer';
import { IsInt, IsObject } from 'class-validator';

export class CreateReqDto {
  @IsObject()
  payment: object;

  @IsObject()
  billing: object;

  @IsObject()
  shipping: object;

  @IsObject()
  line_items: object;

  @IsObject()
  shipping_lines: object;
}

export class RetrieveReqDto {
  @IsInt()
  @Transform((param) => Number(param.value))
  order_id: number;
}

export class ListReqDto {
  @Transform((param) => Number(param.value))
  @IsInt()
  page?: number = 1;

  @Transform((param) => Number(param.value))
  @IsInt()
  size?: number = 10;

  date?: string = '2024-01-01';
}

export class UpdateReqDto {
  @IsInt()
  @Transform((param) => Number(param.value))
  order_id: number;

  @IsObject()
  data: any;
}

export class DeleteReqDto {
  @IsInt()
  @Transform((param) => Number(param.value))
  order_id: number;
}
