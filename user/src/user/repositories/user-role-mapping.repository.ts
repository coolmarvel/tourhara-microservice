import { DataSource, QueryRunner } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserRoleReqDto, UserRoleResDto } from '../dtos';
import { UserRoleMappingMapper } from '../mappers';

/**
 * UserRoleMapping Repository
 *
 * @author 김이안
 */
@Injectable()
export class UserRoleMappingRepository {
  constructor(
    private dataSource: DataSource,
    private userRoleMappingMapper: UserRoleMappingMapper,
  ) {}

  /**
   * 해당 유저가 보유한 모든 역할 조회
   *
   * @param reqDto
   */
  async getRolesAllByUserId(reqDto: UserRoleReqDto): Promise<UserRoleResDto[]> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    const result = await queryRunner.query(
      `
        SELECT role_code 
        FROM user u
        LEFT JOIN user_role_mapping urm
        ON u.user_id = urm.user_id
        LEFT JOIN role r
        ON urm.role_id = r.id
        WHERE u.user_id = ? 
    `,
      [reqDto.userId],
    );

    await queryRunner.release();

    return result.map((row: any) => this.userRoleMappingMapper.toUserRoleResDto(row));
  }
}
