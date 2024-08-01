/**
 * 역할 인터페이스
 *
 * @author 김이안
 */
import { RoleResDto, UserRoleReqDto, UserRoleResDto } from '../dtos';

export interface IRoleService {
  getRolesAll(): Promise<RoleResDto[]>;

  getRolesAllByUserId(reqDto: UserRoleReqDto): Promise<UserRoleResDto[]>;
}
