import { Inject, Injectable } from '@nestjs/common';
import { IUserService } from '../../interfaces/user.interface';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserProductionService implements IUserService {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  async checkUserIsAdmin(uuid: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const pattern = { cmd: 'checkUserIsAdmin_production' };
        const payload = { uuid };
        const { isAdmin } = await firstValueFrom<{ isAdmin: boolean }>(this.client.send<{ isAdmin: boolean }>(pattern, payload));

        return resolve(isAdmin);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async findOneByEmail(email: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const pattern = { cmd: 'findOneByEmail_production' };
        const payload = { email };
        const { id } = await firstValueFrom<{ id: string }>(this.client.send<{ id: string }>(pattern, payload));

        return resolve(id);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async signup(email: string, password: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const pattern = { cmd: 'signup_production' };
        const payload = { email, password };
        const { id } = await firstValueFrom<{ id: string }>(this.client.send<{ id: string }>(pattern, payload));

        return resolve(id);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async validateUser(email: string, password: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const pattern = { cmd: 'validateUser_production' };
        const payload = { email, password };
        const { id } = await firstValueFrom<{ id: string }>(this.client.send<{ id: string }>(pattern, payload));

        return resolve(id);
      } catch (error) {
        return reject(error);
      }
    });
  }
}
