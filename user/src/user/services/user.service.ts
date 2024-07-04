import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { IUserService } from '../interfaces/user.interfaces';
import { User } from '../entities/user.entity';
import { Role } from '../constants/user.enum';

@Injectable()
export class UserService implements IUserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async checkUserIsAdmin(uuid: string): Promise<{ isAdmin: boolean }> {
    try {
      const user = await this.userRepository.findOneBy({ id: uuid });

      return { isAdmin: user.role === Role.Admin };
    } catch (error) {
      throw error;
    }
  }

  async signup(email: string, password: string): Promise<{ id: string }> {
    try {
      const saltRounds = 10;
      const hash = await bcrypt.hash(password, saltRounds);
      const userEntity = this.userRepository.create({ email, password: hash });

      return await this.userRepository.save(userEntity);
    } catch (error) {
      throw error;
    }
  }

  async validateUser(email: string, password: string): Promise<{ id: string }> {
    const user = await this.findOneByEmail(email);
    if (!user) throw new UnauthorizedException();

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException();

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOneBy({ email });
    } catch (error) {
      throw error;
    }
  }
}
