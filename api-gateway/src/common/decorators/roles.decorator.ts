import { SetMetadata } from '@nestjs/common';
import { RoleGroup } from '../../user/constants';

/**
 * 자원별 접근 역할 데코레이터
 *
 * @param roleTypes
 * @constructor
 */
export const ROLES_KEY = 'roles';
export const Roles = (...roleTypes: RoleGroup[]) => SetMetadata(ROLES_KEY, roleTypes);

// TODO DB에서 조회한 사용자의 권한이 페이지 자원 권한과 맞는지 확인 필요
