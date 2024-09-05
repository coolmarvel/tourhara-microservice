import { DataSource, QueryRunner } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '../entities';
import { UserMapper } from '../mappers';
import { CreateUserReqDto } from '../../auth/dtos/user.dto';

/**
 * User Repository
 *
 * @author 김이안
 */
@Injectable()
export class UserRepository {
  constructor(
    private dataSource: DataSource,
    private userMapper: UserMapper,
  ) {}

  /**
   * 유저 전체 조회
   */
  async getUsersAll(): Promise<User[]> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    const result = await queryRunner.query(`
      SELECT user_id, 
            user_name, 
            email_address, 
            company_code, 
            department, 
            created_at, 
            updated_at, 
            use_yn 
      FROM user
    `);

    await queryRunner.release();

    return result.map((row: any) => this.userMapper.toUser(row));
  }

  /**
   * 유저 추가
   *
   * @param reqDto
   */
  async insertUser(reqDto: CreateUserReqDto): Promise<string> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();
      await queryRunner.query(
        `
        INSERT INTO User (
          user_id, 
          user_name, 
          email_address, 
          password, 
          company_code, 
          department,
          created_at,
          updated_at,
          use_yn
        ) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW(), 'Y')
        `,
        [reqDto.userId, reqDto.userName, reqDto.emailAddress, reqDto.password, reqDto.companyCode, reqDto.department],
      );
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    return reqDto.userId;
  }
}
