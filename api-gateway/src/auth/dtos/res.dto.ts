import { ApiProperty } from '@nestjs/swagger';

/**
 * 로그인 Response DTO
 */
export class SigninResDto {
  @ApiProperty({ required: true })
  userName: string;

  @ApiProperty({ required: true })
  accessToken: string;

  @ApiProperty({ required: true })
  refreshToken: string;
}

/**
 * Me API Response DTO
 */
export class MeResDto {
  @ApiProperty({ required: true })
  userId: string;
}

export class SignupResDto {
  @ApiProperty({ required: true })
  id: string;

  @ApiProperty({ required: true })
  accessToken: string;

  @ApiProperty({ required: true })
  refreshToken: string;
}

export class RefreshResDto {
  @ApiProperty({ required: true })
  accessToken: string;

  @ApiProperty({ required: true })
  refreshToken: string;
}
