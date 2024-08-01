import { Role } from '../entities';
import { UserRoleReqDto, UserRoleResDto } from '../dtos';

/**
 * 역할 인터페이스
 *
 * @author 김이안
 */
export interface IRoleService {
  getRolesAll(): Promise<Role[]>;

  getRolesAllByUserId(reqDto: UserRoleReqDto): Promise<UserRoleResDto[]>;
}
