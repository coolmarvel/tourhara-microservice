import { Controller, Get, Param, Post, Req, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { Public } from '../../common';
import { SessionService } from '../services/session.service';

/**
 * Session API Controller // TODO 리팩토링 필요할 수도 있음
 *
 * @author 김이안
 */
@ApiTags('Session')
@ApiExtraModels()
@Controller({ path: 'api/session', version: VERSION_NEUTRAL })
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Public()
  @Post('create')
  @ApiOperation({ summary: '세션 생성 API' })
  async createSession(session: any): Promise<any> {
    return this.sessionService.createSession(session);
  }

  @Public()
  @Post('read')
  @ApiOperation({ summary: '세션 조회 API' })
  async readSession(@Req() req: Request): Promise<any> {
    return this.sessionService.readSession(req);
  }

  @Public()
  @Get('read/:sessionId')
  @ApiOperation({ summary: '특정 세션 조회 API' })
  async readSessionById(@Param('sessionId') sessionId: string): Promise<any> {
    return this.sessionService.readSessionById(sessionId);
  }
}
