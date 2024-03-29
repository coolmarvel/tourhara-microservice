import { BadRequestException, Body, Controller, Post, Headers, VERSION_NEUTRAL } from '@nestjs/common';
import { AuthProductionService } from '../services/auth-production.service';
import { ApiBearerAuth, ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RefreshResDto, SigninResDto, SignupResDto } from '../dtos/res.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiGetResponse } from 'src/common/decorators/swagger.decorator';
import { SigninReqDto, SignupReqDto } from '../dtos/req.dto';
import { User, UserAfterAuth } from 'src/common/decorators/user.decorator';

@ApiTags('Auth-Production')
@ApiExtraModels(SignupResDto, SigninResDto, RefreshResDto)
@Controller({ path: 'api/auth/production', version: VERSION_NEUTRAL })
export class AuthProductionController {
  constructor(private readonly authProductionService: AuthProductionService) {}

  @Public()
  @Post('signup')
  @ApiGetResponse(SignupResDto)
  @ApiOperation({ summary: '회원가입 API (프로덕션)' })
  async signup(@Body() { email, password, passwordConfirm }: SignupReqDto): Promise<SignupResDto> {
    if (password !== passwordConfirm) throw new BadRequestException();

    const { id, accessToken, refreshToken } = await this.authProductionService.signup(email, password);

    return { id, accessToken, refreshToken };
  }

  @Public()
  @Post('signin')
  @ApiGetResponse(SigninResDto)
  @ApiOperation({ summary: '로그인 API (프로덕션)' })
  async signin(@Body() { email, password }: SigninReqDto): Promise<SigninResDto> {
    return await this.authProductionService.signin(email, password);
  }

  @ApiBearerAuth()
  @Post('refresh')
  @ApiGetResponse(RefreshResDto)
  @ApiOperation({ summary: '리프레쉬 API (프로덕션)' })
  async refresh(@Headers('authorization') authorization, @User() user: UserAfterAuth): Promise<RefreshResDto> {
    const token = /Bearer\s(.+)/.exec(authorization)[1];

    const { accessToken, refreshToken } = await this.authProductionService.refresh(token, user.id);

    return { accessToken, refreshToken };
  }
}
