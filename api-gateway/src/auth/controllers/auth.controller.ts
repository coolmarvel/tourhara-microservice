import { BadRequestException, Body, Controller, Headers, Post, Res, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApiGetResponse, Public, User, UserAfterAuth } from '../../common';
import { RefreshResDto, SigninResDto, SignupResDto } from '../dtos/res.dto';
import { SigninReqDto, SignupReqDto } from '../dtos/req.dto';
import { AuthService } from '../services/auth.service';
import { Response } from 'express';

/**
 * Auth API Controller
 *
 * @author 이성현
 */
@ApiTags('Auth')
@ApiExtraModels(SignupResDto, SigninResDto, RefreshResDto)
@Controller({ path: 'api/auth', version: VERSION_NEUTRAL })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signin')
  @ApiOperation({ summary: '로그인 API' })
  async signin(@Body() reqDto: SigninReqDto, @Res() res: Response): Promise<void> {
    try {
      const signinResponse = await this.authService.signin(reqDto);

      res.cookie('sessionId', signinResponse.sessionId, {
        httpOnly: true,
        secure: false,
        sameSite: 'none',
        domain: 'localhost', // 로컬 개발에서는 이 설정이 필요 없을 수도 있음
        path: '/',
        maxAge: 3600000,
      });
      res.cookie('accessToken', signinResponse.accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'none',
        domain: 'localhost', // 로컬 개발에서는 이 설정이 필요 없을 수도 있음
        path: '/',
        maxAge: 3600000,
      });
      res.cookie('refreshToken', signinResponse.refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'none',
        domain: 'localhost', // 로컬 개발에서는 이 설정이 필요 없을 수도 있음
        path: '/',
        maxAge: 3600000,
      });

      res.status(200).json(signinResponse);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  @Public()
  @Post('signout')
  @ApiOperation({ summary: '로그아웃 API' })
  async signout(@Res() res: Response): Promise<void> {
    res.clearCookie('userId', { path: '/', sameSite: 'none', secure: true });
    res.clearCookie('sessionId', { path: '/', sameSite: 'none', secure: true });
    res.clearCookie('accessToken', { path: '/', sameSite: 'none', secure: true });
    res.clearCookie('refreshToken', { path: '/', sameSite: 'none', secure: true });
    res.status(200).json({ message: 'Logged out successfully' });
  }

  @Public()
  @Post('signup')
  @ApiGetResponse(SignupResDto)
  @ApiOperation({ summary: '회원가입 API' })
  async signup(@Body() reqDto: SignupReqDto): Promise<SignupResDto> {
    if (reqDto.password !== reqDto.passwordConfirm) {
      throw new BadRequestException();
    }
    const { id, accessToken, refreshToken } = await this.authService.signup(reqDto);

    return { id, accessToken, refreshToken };
  }

  @ApiBearerAuth()
  @Post('refresh')
  @ApiGetResponse(RefreshResDto)
  @ApiOperation({ summary: '리프레쉬 API' })
  async refresh(@Headers('authorization') authorization, @User() user: UserAfterAuth): Promise<RefreshResDto> {
    const token = /Bearer\s(.+)/.exec(authorization)[1];
    const { accessToken, refreshToken } = await this.authService.refresh(token, user.id);

    return { accessToken, refreshToken };
  }
}
