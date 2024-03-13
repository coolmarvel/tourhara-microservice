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

  @Public()
  @Post('signup')
  @ApiGetResponse(SignupResDto)
  @ApiOperation({ summary: '회원가입 API (PUBLIC)' })
  async signup(@Body() { email, password, passwordConfirm }: SignupReqDto): Promise<SignupResDto> {
    if (password !== passwordConfirm) throw new BadRequestException();

    const { id, accessToken, refreshToken } = await this.authService.signup(email, password);

    return { id, accessToken, refreshToken };
  }

  @Public()
  @Post('signin')
  @ApiGetResponse(SigninResDto)
  @ApiOperation({ summary: '로그인 API (PUBLIC)' })
  async signin(@Body() { email, password }: SigninReqDto): Promise<SigninResDto> {
    return await this.authService.signin(email, password);
  }

  @ApiBearerAuth()
  @Post('refresh')
  @ApiGetResponse(RefreshResDto)
  @ApiOperation({ summary: '리프레쉬 API (BEARER)' })
  async refresh(@Headers('authorization') authorization, @User() user: UserAfterAuth): Promise<RefreshResDto> {
    const token = /Bearer\s(.+)/.exec(authorization)[1];

    const { accessToken, refreshToken } = await this.authService.refresh(token, user.id);

    return { accessToken, refreshToken };
  }
}
