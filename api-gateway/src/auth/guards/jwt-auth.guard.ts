import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

import { UserService } from '../../user/services/user.service';
import { IS_PUBLIC_KEY, ROLES_KEY } from '../../common';
import { RoleGroup } from '../../user/constants';

/**
 * JWT 토큰을 검증하고, 사용자의 권한 확인
 *
 * @author 이성현
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private userService: UserService,
  ) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
    if (isPublic) return true;

    const http = context.switchToHttp();
    const { url, headers } = http.getRequest<Request>();

    const authorization = headers['authorization'];
    if (!authorization) throw new UnauthorizedException();
    if (!authorization.includes('Bearer')) throw new UnauthorizedException();

    const token = /Bearer\s(.+)/.exec(authorization)[1];
    if (!token) throw new UnauthorizedException('accessToken is required.');

    const decoded = this.jwtService.decode(token);
    if (!['/api/auth/refresh'].includes(url) && decoded['tokenType'] === 'refresh') {
      throw new UnauthorizedException('accessToken is required.');
    }

    const requiredRoles = this.reflector.getAllAndOverride<RoleGroup[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
    if (requiredRoles) {
      // const userId = decoded['sub'];
      // TODO 해당 부분 권한 적용 작업 시 수정이 필요한 부분이기 때문에 주석 처리
      // return this.userService.checkUserIsAdmin(userId);
    }

    return super.canActivate(context);
  }
}
