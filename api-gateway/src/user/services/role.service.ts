import { Inject, Injectable } from '@nestjs/common';
import { IRoleService } from '../interfaces';
import { RoleResDto, UserRoleReqDto, UserRoleResDto } from '../dtos';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

/**
 * 역할 서비스
 *
 * @author 김이안
 */
@Injectable()
export class RoleService implements IRoleService {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  /**
   * 역할 전체 조회 API
   */
  async getRolesAll(): Promise<RoleResDto[]> {
    try {
      const pattern: any = { cmd: 'getRolesAll' };
      const payload = {};
      return await firstValueFrom(this.client.send(pattern, payload));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * 해당 유저가 보유한 모든 역할 조회 API
   *
   * @param reqDto
   */
  async getRolesAllByUserId(reqDto: UserRoleReqDto): Promise<UserRoleResDto[]> {
    try {
      const pattern: any = { cmd: 'getRolesAllByUserId' };
      const payload = reqDto;

      return await firstValueFrom(this.client.send<UserRoleResDto[]>(pattern, payload));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
