/**
 * 역할 유형 정의
 *
 * @author 김이안
 */
import { RoleGroup } from './roleGroup.enum';

class RoleType {
  constructor(
    readonly key: string,
    readonly name: string,
    readonly group: RoleGroup,
    readonly parent: RoleType | null,
  ) {}

  static SYSTEM_MANAGER = new RoleType('SYSTEM_MANAGER', '시스템 관리자', RoleGroup.ADMIN, null);
  static SYSTEM_DEVELOPER = new RoleType('SYSTEM_DEVELOPER', '총괄 개발자', RoleGroup.MANAGER, RoleType.SYSTEM_MANAGER);
  static SERVICE_SYSTEM_DEVELOPER = new RoleType('SERVICE_SYSTEM_DEVELOPER', '일반 개발자', RoleGroup.MANAGER, RoleType.SYSTEM_MANAGER);
  static SERVICE_MANAGER = new RoleType('SERVICE_MANAGER', '운영 관리자', RoleGroup.MANAGER, RoleType.SYSTEM_MANAGER);
  static SERVICE_USER = new RoleType('SERVICE_USER', '일반 사용자', RoleGroup.USER, RoleType.SERVICE_MANAGER);
}

export { RoleType };

/**
 * TypeORM 에서 enum 의 키 배열을 반환
 *
 * @param enumObject
 */
export function enumToArray(enumObject: object): string[] {
  return Object.keys(enumObject);
}
