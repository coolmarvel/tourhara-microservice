import { Controller } from '@nestjs/common';
import { Response } from 'express';
import { SessionService } from '../services/session.service';
import { Session } from 'express-session';
import { MessagePattern } from '@nestjs/microservices';

/**
 * Session Controller // TODO 리팩토링 필요할 수도 있음
 *
 * @author 김이안
 */
interface CustomSession extends Partial<Session> {
  createdAt: Date;
  validUntil: number;
}

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  private sessions: Record<string, CustomSession> = {}; // 임시로 메모리에 세션 저장

  /**
   * UUID로 세션 생성
   *
   * @param session
   * @param res
   */
  @MessagePattern({ cmd: 'createSession' })
  createSession(session: any, res: Response): any {
    const sessionId = this.sessionService.createSessionId();

    // 쿠키에 sessionId 저장
    res.cookie('sessionId', session.sessionId, {
      httpOnly: true, // 클라이언트에서 쿠키 접근 불가 (XSS 공격 방지)
      secure: false, // HTTPS 연결에서만 쿠키 전송 (보안 강화)
      maxAge: 90 * 24 * 60 * 60 * 1000, // 90일
    });

    res.status(200).send({ sessionId });
  }

  /**
   * 세션 조회
   *
   * @param payload
   */
  @MessagePattern({ cmd: 'readSession' })
  readSession(payload: any): any {
    const sessionId = payload.sessionId;

    if (sessionId && this.sessions[sessionId]) {
      return { message: 'Session found', sessionData: this.sessions[sessionId] };
    } else {
      const createSessionId = this.sessionService.createSessionId();

      // 기존 Session 객체와 추가 속성을 병합
      this.sessions[createSessionId] = {
        ...({} as Session), // 기존 Session 객체 생성
        createdAt: new Date(), // 여기서 Date 객체를 올바르게 생성
        validUntil: new Date().getTime() + 30 * 60 * 1000, // 30분동안 유효
      };
      return { message: 'Session created', sessionData: this.sessions[createSessionId] };
    }
  }

  /**
   * sessionId로 특정 session 조회
   *
   * @param sessionId
   * @param res
   */
  @MessagePattern({ cmd: 'readSessionById' })
  readSessionById(sessionId: string, res: Response): any {
    if (this.sessions[sessionId]) {
      res.send({ sessionId, sessionData: this.sessions[sessionId] });
    } else {
      res.status(404).send({ message: 'Session not found or expired' });
    }
  }
}
