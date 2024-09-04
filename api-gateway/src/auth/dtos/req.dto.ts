import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

/**
 * 로그인 요청 DTO 모음
 */
export class SigninReqDto {
  @ApiProperty({ required: true, example: 'seonghyunlee' })
  @IsNotEmpty({ message: '아이디는 비어있을 수 없습니다.' })
  @IsString({ message: '아이디는 문자열이어야 합니다.' })
  @MaxLength(30, { message: '아이디는 최대 30자를 넘을 수 없습니다.' })
  userId: string;

  @ApiProperty({ required: true, example: 'Athometrip12!' })
  @IsString({ message: '비밀번호는 문자열이어야 합니다.' })
  @IsNotEmpty({ message: '비밀번호는 비어있을 수 없습니다.' })
  password: string;
}

/**
 * 회원가입 DTO 모음
 */
export class SignupReqDto {
  @ApiProperty({ required: true, example: 'example' })
  @MaxLength(30, { message: '아이디는 최대 30자를 넘을 수 없습니다.' })
  userId: string;

  @ApiProperty({ required: true, example: 'Athometrip12!' })
  password: string;

  @ApiProperty({ required: true, example: 'Athometrip12!' })
  // @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{10,30}$/)
  passwordConfirm: string;

  @ApiProperty({ required: true, example: '홍길동' })
  userName: string;

  @ApiProperty({ required: true, example: 'exmaple@athometrip.com' })
  emailAddress: string;

  @ApiProperty({ required: true, example: 'TOURHARA' })
  companyCode: string;

  @ApiProperty({ required: true, example: 'IT팀' })
  department: string;
}
