/**
 * 권한 관련 DTO 모음
 *
 * @author 김이안
 */
type Role = {
  roleCode: string;
};

/**
 * 요청 DTO
 */
export class AuthReqDto {
  userId: string;
  password: string;
}

/**
 * 응답 DTO
 */
export class AuthResDto {
  userId: string;
  userName: string;
  roles: Role[];
}

/**
 * 유저 데이터 검증용 응답 DTO
 */
export class UserResDto {
  userId: string;
  userName: string;
  password: string;

  static toUserResDto(result: any): UserResDto {
    const user = new UserResDto();
    user.userId = result.user_id;
    user.userName = result.user_name;
    user.password = result.password;
    return user;
  }

  /**
   * API 응답 결과를 위한 객체 변환
   *
   * @param user
   */
  static toAuthResDto(user: UserResDto): AuthResDto {
    const res = new AuthResDto();
    res.userId = user.userId;
    res.userName = user.userName;
    return res;
  }
}
