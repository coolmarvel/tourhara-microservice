import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../services/auth.service';
import { SigninReqDto } from '../dtos/req.dto';

/**
 * JWT 인증과 유저 검증
 *
 * @author 이성현
 */
@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('auth.secret', { infer: true }),
    });
  }

  async validate(reqDto: SigninReqDto) {
    const user = await this.authService.validateUserCredentials(reqDto);
    if (!user) {
      throw new UnauthorizedException();
    }

    return { userId: user.id, sessionId: user.sessionId };
  }
}
