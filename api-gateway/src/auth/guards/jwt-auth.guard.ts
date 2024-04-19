import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';
import { ROLES_KEY } from 'src/common/decorators/role.decorator';
import { Role } from 'src/user/constants/user.enum';
import { UserProductionService } from 'src/user/services/production/user.production.service';
import { UserStagingService } from 'src/user/services/staging/user.staging.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private userStagingService: UserStagingService,
    private userProductionService: UserProductionService,
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
    if (!['/api/auth/staging/refresh', '/api/auth/production/refresh'].includes(url) && decoded['tokenType'] === 'refresh') {
      throw new UnauthorizedException('accessToken is required.');
    }

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
    if (requiredRoles) {
      const userId = decoded['sub'];
      const isStaging = url.includes('/staging/');

      const checkUserIsAdmin = isStaging ? this.userStagingService.checkUserIsAdmin(userId) : this.userProductionService.checkUserIsAdmin(userId);

      return checkUserIsAdmin;
    }

    return super.canActivate(context);
  }
}
