import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CheckUserResDto {
  @IsBoolean()
  isAdmin: boolean;
}

export class SignupResDto {
  @IsString()
  id: string;
}

export class ValidateResDto {
  @IsString()
  id: string;
}

export class FindUserResDto {
  @IsOptional()
  @IsString()
  id?: string | null;
}
