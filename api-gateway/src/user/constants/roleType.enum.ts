/**
 * 역할 유형 정의
 *
 * @author 김이안
 */
import { RoleGroup } from './roleGroup.enum';

export class RoleType {
  public static SYSTEM_MANAGER = new RoleType('SYSTEM_MANAGER', '시스템 관리자', RoleGroup.ADMIN, null);
  public static SYSTEM_DEVELOPER = new RoleType('SYSTEM_DEVELOPER', '총괄 개발자', RoleGroup.MANAGER, RoleType.SYSTEM_MANAGER);
  public static SERVICE_SYSTEM_DEVELOPER = new RoleType('SERVICE_SYSTEM_DEVELOPER', '일반 개발자', RoleGroup.MANAGER, RoleType.SYSTEM_MANAGER);
  public static SERVICE_MANAGER = new RoleType('SERVICE_MANAGER', '운영 관리자', RoleGroup.MANAGER, RoleType.SYSTEM_MANAGER);
  public static SERVICE_USER = new RoleType('SERVICE_USER', '일반 사용자', RoleGroup.USER, RoleType.SERVICE_MANAGER);

  constructor(
    public key: string,
    public name: string,
    public group: RoleGroup,
    public parent: RoleType | null,
  ) {}

  public toString(): string {
    return this.name;
  }
}
