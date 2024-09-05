import { Injectable } from '@nestjs/common';
import { UserResDto } from '../dtos/auth.dto';

/**
 * Auth Mapper
 *
 * @author 김이안
 */
@Injectable()
export class AuthMapper {
  /**
   * 사용자 유효성 검증을 위한 객체 변환용 함수
   * // TODO Mapper를 한 곳에 모아둘지 dto 내부에 사용할지 고민 필요
   *
   * @param row
   */
  toValidatedRes(row: { user_id: string; user_name: string; password: string }): UserResDto {
    const res = new UserResDto();
    res.userId = row.user_id;
    res.userName = row.user_name;
    res.password = row.password;
    return res;
  }
}
