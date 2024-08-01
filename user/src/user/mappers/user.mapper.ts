import { UseYn } from '../constants';
import { User } from '../entities';
import { Injectable } from '@nestjs/common';

/**
 * User Mapper
 *
 * @author 김이안
 */
@Injectable()
export class UserMapper {
  /**
   * row 를 User 객체로 변환하기 위한 함수
   *
   * @param row
   * @author 김이안
   */
  toUser(row: { user_id: string; user_name: string; email_address: string; company_code: string; department: string; created_at: Date; updated_at: Date; use_yn: UseYn }): User {
    const user = new User();
    user.userId = row.user_id;
    user.userName = row.user_name;
    user.emailAddress = row.email_address;
    user.companyCode = row.company_code;
    user.department = row.department;
    user.createdAt = row.created_at;
    user.updatedAt = row.updated_at;
    user.useYn = row.use_yn;
    return user;
  }
}
