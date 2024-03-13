import { IsEmail, IsString, IsUUID } from 'class-validator';

export class CheckUserReqDto {
  @IsUUID()
  uuid: string;
}

export class SignupReqDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class ValidateReqDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class FindUserReqDto {
  @IsEmail()
  email: string;
}
