import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { SigninReqDto } from '../dtos/req.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(reqDto: SigninReqDto): Promise<any> {
    const user = await this.authService.validateUserCredentials(reqDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
