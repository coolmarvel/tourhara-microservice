import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

/**
 * Session Service // TODO 리팩토링 필요할 수도 있음
 *
 * @author 김이안
 */
@Injectable()
export class SessionService {
  /**
   * UUID 생성
   */
  createSessionId(): string {
    return uuidv4();
  }
}
