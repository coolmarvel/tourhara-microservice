/**
 * 유저 서비스 응답 DTO
 *
 * @author 김이안
 */
import { ApiProperty } from '@nestjs/swagger';
import { UseYn } from '../constants/useYn.enum';

export class UserResDto {
  @ApiProperty({ required: true })
  userId: string;

  @ApiProperty({ required: true })
  userName: string;

  @ApiProperty({ required: true })
  emailAddress: string;

  @ApiProperty({ required: true })
  companyCode: string;

  @ApiProperty({ required: true })
  department: string;

  @ApiProperty({ required: true })
  createdAt: Date;

  @ApiProperty({ required: true })
  updatedAt: Date;

  @ApiProperty({ required: true })
  useYn: UseYn;
}
