import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Request } from 'express';

/**
 * Session Service // TODO 리팩토링 필요할 수도 있음
 *
 * @author 김이안
 */
@Injectable()
export class SessionService {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  /**
   * 세션 생성
   */
  async createSession(session: any): Promise<any> {
    try {
      const pattern = { cmd: 'createSession' };
      const payload = { session };

      return await firstValueFrom(this.client.send(pattern, payload));
    } catch (e) {
      throw new Error(e.message);
    }
  }

  /**
   * 세션 조회
   *
   */
  async readSession(req: Request): Promise<any> {
    try {
      const pattern = { cmd: 'readSession' };
      const payload = { sessionId: req.cookies?.['sessionId'] }; // sessionId 전달

      return await firstValueFrom(this.client.send(pattern, payload));
    } catch (e) {
      throw new Error(e.message);
    }
  }

  /**
   * 특정 세션 조회
   *
   * @param sessionId
   */
  async readSessionById(sessionId: string): Promise<any> {
    try {
      const pattern = { cmd: 'readSessionById' };
      const payload = { sessionId };

      return await firstValueFrom(this.client.send(pattern, payload));
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
