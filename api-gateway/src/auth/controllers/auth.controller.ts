import { Controller, Post, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('Auth')
@ApiExtraModels()
@Controller({ path: 'api/auth', version: VERSION_NEUTRAL })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '회원가입 API (PUBLIC)' })
  @Public()
  @Post('signup')
  async signup() {
    return 'signup';
  }

  @ApiOperation({ summary: '로그인 API (PUBLIC)' })
  @Public()
  @Post('signin')
  async signin() {
    return 'signin';
  }

  @ApiOperation({ summary: '리프레쉬 API (BEARER)' })
  @ApiBearerAuth()
  @Post('refresh')
  async refresh() {
    return 'refresh';
  }
}
