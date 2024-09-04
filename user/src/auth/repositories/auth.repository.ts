import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { AuthMapper } from '../mappers/auth.mapper';
import { UserResDto } from '../dtos/auth.dto';

/**
 * Auth Repository
 *
 * @author 김이안
 */
@Injectable()
export class AuthRepository {
  constructor(
    private dataSource: DataSource,
    private authMapper: AuthMapper,
  ) {}

  /**
   * 사용자 유효성 검증
   *
   * @param userId
   */
  async findOneByUserId(userId: string): Promise<UserResDto | null> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    let result;

    try {
      await queryRunner.connect();
      result = await queryRunner.query(
        `
        SELECT user_id,
            user_name,
            password 
        FROM user
        WHERE user_id = ? 
    `,
        [userId],
      );

      if (result.length > 0) {
        return UserResDto.toUserResDto(result[0]);
      }
      return null; // 일치하는 사용자가 없는 경우 Null 반환
    } finally {
      await queryRunner.release();
    }
  }
}
