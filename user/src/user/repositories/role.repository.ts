import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { Role } from '../entities';
import { RoleMapper } from '../mappers';

/**
 * Role Repository
 *
 * @author 김이안
 */
@Injectable()
export class RoleRepository {
  constructor(
    private dataSource: DataSource,
    private roleMapper: RoleMapper,
  ) {}

  /**
   * 역할 전체 조회
   */
  async getRolesAll(): Promise<Role[]> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    const result = await queryRunner.query(`
      SELECT id,
            role_group,
            role_type,
            role_code,
            role_name
      FROM role
    `);

    await queryRunner.release();

    return result.map((row: any) => this.roleMapper.toRole(row));
  }
}
