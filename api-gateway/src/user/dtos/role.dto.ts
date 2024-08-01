import { ApiProperty } from '@nestjs/swagger';

/**
 * Role Res Dto
 *
 * @author 김이안
 */
export class RoleResDto {
  @ApiProperty({ required: true })
  id: number;

  @ApiProperty({ required: true })
  roleGroup: string;

  @ApiProperty({ required: true })
  roleType: string;

  @ApiProperty({ required: true })
  roleCode: string;

  @ApiProperty({ required: true })
  roleName: string;
}
