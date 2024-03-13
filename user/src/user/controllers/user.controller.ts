import { Controller } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'checkUserIsAdmin' })
  async checkUserIsAdmin({ uuid }: { uuid: string }): Promise<{ isAdmin: boolean }> {
    return await this.userService.checkUserIsAdmin(uuid);
  }

  @MessagePattern({ cmd: 'signup' })
  async signup({ email, password }: { email: string; password: string }): Promise<{ id: string }> {
    const user = await this.userService.signup(email, password);

    return { id: user.id };
  }

  @MessagePattern({ cmd: 'validateUser' })
  async validateUser({ email, password }: { email: string; password: string }): Promise<{ id: string }> {
    const { id } = await this.userService.validateUser(email, password);

    return { id };
  }

  @MessagePattern({ cmd: 'findOneByEmail' })
  async findOneByEmail({ email }: { email: string }): Promise<{ id: string | null }> {
    const user = await this.userService.findOneByEmail(email);

    return { id: user?.id || null };
  }
}
