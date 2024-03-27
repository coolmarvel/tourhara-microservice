import { BadRequestException, Body, Controller, Headers, Post, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { Public } from 'src/common/decorators/public.decorator';
import { SigninReqDto, SignupReqDto } from '../dtos/req.dto';
import { RefreshResDto, SigninResDto, SignupResDto } from '../dtos/res.dto';
import { User, UserAfterAuth } from 'src/common/decorators/user.decorator';
import { ApiGetResponse } from 'src/common/decorators/swagger.decorator';

@ApiTags('Auth')
@ApiExtraModels(SignupResDto, SigninResDto, RefreshResDto)
@Controller({ path: 'api/auth', version: VERSION_NEUTRAL })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // STAGING
  @Public()
  @Post('stag/signup')
  @ApiGetResponse(SignupResDto)
  @ApiOperation({ summary: '회원가입 API (스테이징)' })
  async signup_stag(@Body() { email, password, passwordConfirm }: SignupReqDto): Promise<SignupResDto> {
    if (password !== passwordConfirm) throw new BadRequestException();

    const { id, accessToken, refreshToken } = await this.authService.signup_stag(email, password);

    return { id, accessToken, refreshToken };
  }

  @Public()
  @Post('stag/signin')
  @ApiGetResponse(SigninResDto)
  @ApiOperation({ summary: '로그인 API (스테이징)' })
  async signin_stag(@Body() { email, password }: SigninReqDto): Promise<SigninResDto> {
    return await this.authService.signin_stag(email, password);
  }

  @ApiBearerAuth()
  @Post('stag/refresh')
  @ApiGetResponse(RefreshResDto)
  @ApiOperation({ summary: '리프레쉬 API (스테이징)' })
  async refresh_stag(@Headers('authorization') authorization, @User() user: UserAfterAuth): Promise<RefreshResDto> {
    const token = /Bearer\s(.+)/.exec(authorization)[1];

    const { accessToken, refreshToken } = await this.authService.refresh_stag(token, user.id);

    return { accessToken, refreshToken };
  }

  // PRODUCTION
  @Public()
  @Post('prod/signup')
  @ApiGetResponse(SignupResDto)
  @ApiOperation({ summary: '회원가입 API (프로덕션)' })
  async signup_prod(@Body() { email, password, passwordConfirm }: SignupReqDto): Promise<SignupResDto> {
    if (password !== passwordConfirm) throw new BadRequestException();

    const { id, accessToken, refreshToken } = await this.authService.signup_prod(email, password);

    return { id, accessToken, refreshToken };
  }

  @Public()
  @Post('prod/signin')
  @ApiGetResponse(SigninResDto)
  @ApiOperation({ summary: '로그인 API (프로덕션)' })
  async signin_prod(@Body() { email, password }: SigninReqDto): Promise<SigninResDto> {
    return await this.authService.signin_prod(email, password);
  }

  @ApiBearerAuth()
  @Post('prod/refresh')
  @ApiGetResponse(RefreshResDto)
  @ApiOperation({ summary: '리프레쉬 API (프로덕션)' })
  async refresh_prod(@Headers('authorization') authorization, @User() user: UserAfterAuth): Promise<RefreshResDto> {
    const token = /Bearer\s(.+)/.exec(authorization)[1];

    const { accessToken, refreshToken } = await this.authService.refresh_prod(token, user.id);

    return { accessToken, refreshToken };
  }
}
