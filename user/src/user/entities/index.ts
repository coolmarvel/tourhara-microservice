/**
 * entities 폴더의 모든 모듈을 관리하고 외부에 내보내는 역할을 하는 파일
 *
 * @author 이성현
 */
import { User } from './user.entity';
import { Role } from './role.entity';
import { UserRoleMapping } from './user-role-mapping.entity';

export { User, Role, UserRoleMapping };

export const entities = [User, Role, UserRoleMapping];
