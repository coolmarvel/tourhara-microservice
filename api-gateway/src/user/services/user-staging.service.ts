import { Inject, Injectable } from '@nestjs/common';
import { IUserService } from '../interfaces/user.interface';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserStagingService implements IUserService {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  async checkUserIsAdmin(uuid: string): Promise<boolean> {
    const pattern = { cmd: 'checkUserIsAdmin_staging' };
    const payload = { uuid };
    const { isAdmin } = await firstValueFrom<{ isAdmin: boolean }>(this.client.send<{ isAdmin: boolean }>(pattern, payload));

    return isAdmin;
  }

  async findOneByEmail(email: string): Promise<string> {
    const pattern = { cmd: 'findOneByEmail_staging' };
    const payload = { email };
    const { id } = await firstValueFrom<{ id: string }>(this.client.send<{ id: string }>(pattern, payload));

    return id;
  }

  async signup(email: string, password: string): Promise<string> {
    const pattern = { cmd: 'signup_staging' };
    const payload = { email, password };
    const { id } = await firstValueFrom<{ id: string }>(this.client.send<{ id: string }>(pattern, payload));

    return id;
  }

  async validateUser(email: string, password: string): Promise<string> {
    const pattern = { cmd: 'validateUser_staging' };
    const payload = { email, password };
    const { id } = await firstValueFrom<{ id: string }>(this.client.send<{ id: string }>(pattern, payload));

    return id;
  }
}
