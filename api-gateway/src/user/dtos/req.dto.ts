import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsUUID } from 'class-validator';

export class CheckUserReqDto {
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;
}

export class FindUserReqDto {
  @ApiProperty({ required: true })
  @IsEmail()
  email: string;
}

export class SignupAndValidateReqDto {
  @ApiProperty({ required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  password: string;
}
