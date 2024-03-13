import { Transform } from 'class-transformer';
import { IsInt, IsObject, IsString } from 'class-validator';

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
  @IsString()
  order_id: string;
}

export class ListReqDto {
  @Transform((param) => Number(param.value))
  @IsInt()
  page?: number = 1;

  @Transform((param) => Number(param.value))
  @IsInt()
  size?: number = 10;
}

export class UpdateReqDto {
  @IsString()
  order_id: string;

  @IsObject()
  data: any;
}

export class DeleteReqDto {
  @IsString()
  order_id: string;
}
