import { BadRequestException, Body, Controller, Post, Headers, VERSION_NEUTRAL } from '@nestjs/common';
import { AuthStagingService } from '../services/auth-staging.service';
import { ApiBearerAuth, ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RefreshResDto, SigninResDto, SignupResDto } from '../dtos/res.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiGetResponse } from 'src/common/decorators/swagger.decorator';
import { SigninReqDto, SignupReqDto } from '../dtos/req.dto';
import { User, UserAfterAuth } from 'src/common/decorators/user.decorator';

@ApiTags('Auth-Staging')
@ApiExtraModels(SignupResDto, SigninResDto, RefreshResDto)
@Controller({ path: 'api/auth/staging', version: VERSION_NEUTRAL })
export class AuthStagingController {
  constructor(private readonly authStagingService: AuthStagingService) {}

  @Public()
  @Post('signup')
  @ApiGetResponse(SignupResDto)
  @ApiOperation({ summary: '회원가입 API (스테이징)' })
  async signup(@Body() { email, password, passwordConfirm }: SignupReqDto): Promise<SignupResDto> {
    if (password !== passwordConfirm) throw new BadRequestException();

    const { id, accessToken, refreshToken } = await this.authStagingService.signup(email, password);

    return { id, accessToken, refreshToken };
  }

  @Public()
  @Post('signin')
  @ApiGetResponse(SigninResDto)
  @ApiOperation({ summary: '로그인 API (스테이징)' })
  async signin(@Body() { email, password }: SigninReqDto): Promise<SigninResDto> {
    return await this.authStagingService.signin(email, password);
  }

  @ApiBearerAuth()
  @Post('refresh')
  @ApiGetResponse(RefreshResDto)
  @ApiOperation({ summary: '리프레쉬 API (스테이징)' })
  async refresh(@Headers('authorization') authorization, @User() user: UserAfterAuth): Promise<RefreshResDto> {
    const token = /Bearer\s(.+)/.exec(authorization)[1];

    const { accessToken, refreshToken } = await this.authStagingService.refresh(token, user.id);

    return { accessToken, refreshToken };
  }
}
