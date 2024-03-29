import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IUserService } from '../interfaces/user.interfaces';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../constants/user.enum';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserProductionService implements IUserService {
  constructor(@InjectRepository(User, 'production') private readonly userRepository: Repository<User>) {}

  async checkUserIsAdmin(uuid: string): Promise<{ isAdmin: boolean }> {
    const user = await this.userRepository.findOneBy({ id: uuid });

    return { isAdmin: user.role === Role.Admin };
  }

  async signup(email: string, password: string): Promise<{ id: string }> {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    const userEntity = this.userRepository.create({ email, password: hash });
    const user = await this.userRepository.save(userEntity);

    return user;
  }

  async validateUser(email: string, password: string): Promise<{ id: string }> {
    const user = await this.findOneByEmail(email);
    if (!user) throw new UnauthorizedException();

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException();

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });

    return user;
  }
}
