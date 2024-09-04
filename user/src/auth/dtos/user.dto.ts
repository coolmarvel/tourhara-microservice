import { IsBoolean, IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

export class CheckUserReqDto {
  @IsUUID()
  uuid: string;
}

export class CheckUserResDto {
  @IsBoolean()
  isAdmin: boolean;
}

/**
 * 유저 등록 요청 DTO
 */
export class CreateUserReqDto {
  userId: string;
  password: string;
  userName: string;
  emailAddress: string;
  companyCode: string;
  department: string;
}

export class SignupResDto {
  @IsString()
  id: string;
}

export class ValidateReqDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class ValidateResDto {
  @IsString()
  id: string;
}

export class FindUserReqDto {
  @IsString()
  userId: string;
}

export class FindUserResDto {
  @IsOptional()
  @IsString()
  id?: string | null;
}
