import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { IUserService } from '../interfaces';
import { UserResDto } from '../dtos';

/**
 * 유저 서비스
 *
 * @author 이성현
 */
@Injectable()
export class UserService implements IUserService {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  /**
   * 유저 전체 조회
   */
  async getUsersAll(): Promise<UserResDto[]> {
    try {
      const pattern: any = { cmd: 'getUsersAll' };
      const payload = {};

      return await firstValueFrom(this.client.send(pattern, payload));
    } catch (error) {
      throw error;
    }
  }

  // TODO 하위 코드들은 사용하는 로직인지 확인 필요
  async checkUserIsAdmin(uuid: string): Promise<boolean> {
    try {
      const pattern = { cmd: 'checkUserIsAdmin' };
      const payload = { uuid };
      const { isAdmin } = await firstValueFrom<{ isAdmin: boolean }>(
        this.client.send<{
          isAdmin: boolean;
        }>(pattern, payload),
      );

      return isAdmin;
    } catch (error) {
      throw error;
    }
  }

  async findOneByEmail(email: string): Promise<string> {
    try {
      const pattern = { cmd: 'findOneByEmail' };
      const payload = { email };
      const { id } = await firstValueFrom<{ id: string }>(this.client.send<{ id: string }>(pattern, payload));

      return id;
    } catch (error) {
      throw error;
    }
  }

  async signup(email: string, password: string): Promise<string> {
    try {
      const pattern = { cmd: 'signup' };
      const payload = { email, password };
      const { id } = await firstValueFrom<{ id: string }>(this.client.send<{ id: string }>(pattern, payload));

      return id;
    } catch (error) {
      throw error;
    }
  }

  async validateUser(email: string, password: string): Promise<string> {
    try {
      const pattern = { cmd: 'validateUser' };
      const payload = { email, password };
      const { id } = await firstValueFrom<{ id: string }>(this.client.send<{ id: string }>(pattern, payload));

      return id;
    } catch (error) {
      throw error;
    }
  }
}
