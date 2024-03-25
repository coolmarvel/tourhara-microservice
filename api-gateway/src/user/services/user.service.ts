import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IUserService } from '../interfaces/user.interface';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService implements IUserService {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  // STAGING
  async checkUserIsAdmin_stag(uuid: string): Promise<boolean> {
    const pattern = { cmd: 'checkUserIsAdmin_stag' };
    const payload = { uuid };
    const { isAdmin } = await firstValueFrom<{ isAdmin: boolean }>(this.client.send<{ isAdmin: boolean }>(pattern, payload));

    return isAdmin;
  }

  async findOneByEmail_stag(email: string): Promise<string> {
    const pattern = { cmd: 'findOneByEmail_stag' };
    const payload = { email };
    const { id } = await firstValueFrom<{ id: string }>(this.client.send<{ id: string }>(pattern, payload));

    return id;
  }

  async signup_stag(email: string, password: string): Promise<string> {
    const pattern = { cmd: 'signup_stag' };
    const payload = { email, password };
    const { id } = await firstValueFrom<{ id: string }>(this.client.send<{ id: string }>(pattern, payload));

    return id;
  }

  async validateUser_stag(email: string, password: any): Promise<string> {
    const pattern = { cmd: 'validateUser_stag' };
    const payload = { email, password };
    const { id } = await firstValueFrom<{ id: string }>(this.client.send<{ id: string }>(pattern, payload));

    return id;
  }

  // PRODUCTION
  async checkUserIsAdmin_prod(uuid: string): Promise<boolean> {
    const pattern = { cmd: 'checkUserIsAdmin_prod' };
    const payload = { uuid };
    const { isAdmin } = await firstValueFrom<{ isAdmin: boolean }>(this.client.send<{ isAdmin: boolean }>(pattern, payload));

    return isAdmin;
  }

  async findOneByEmail_prod(email: string): Promise<string> {
    const pattern = { cmd: 'findOneByEmail_prod' };
    const payload = { email };
    const { id } = await firstValueFrom<{ id: string }>(this.client.send<{ id: string }>(pattern, payload));

    return id;
  }

  async signup_prod(email: string, password: string): Promise<string> {
    const pattern = { cmd: 'signup_prod' };
    const payload = { email, password };
    const { id } = await firstValueFrom<{ id: string }>(this.client.send<{ id: string }>(pattern, payload));

    return id;
  }

  async validateUser_prod(email: string, password: any): Promise<string> {
    const pattern = { cmd: 'validateUser_prod' };
    const payload = { email, password };
    const { id } = await firstValueFrom<{ id: string }>(this.client.send<{ id: string }>(pattern, payload));

    return id;
  }
}
