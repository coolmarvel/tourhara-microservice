import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { IUserService } from '../interfaces';
import { UserResDto } from '../dtos';
import { SignupReqDto } from '../../auth/dtos/req.dto';

/**
 * 유저 관리 서비스
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

  /**
   * userId로 단건 조회
   *
   * @param userId
   */
  async findOneByUserId(userId: string): Promise<string> {
    try {
      const pattern = { cmd: 'findOneByUserId' };
      const payload = { userId };
      const { id } = await firstValueFrom<{ id: string }>(this.client.send<{ id: string }>(pattern, payload));

      return id;
    } catch (error) {
      throw error;
    }
  }

  /**
   * 유저 등록
   *
   * @param reqDto
   */
  async signup(reqDto: SignupReqDto): Promise<string> {
    try {
      const pattern = { cmd: 'signup' };
      const payload = reqDto;
      return await firstValueFrom(this.client.send(pattern, payload));
    } catch (error) {
      throw error;
    }
  }
}
