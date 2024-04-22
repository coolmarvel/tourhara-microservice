import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IUserService } from '../../interfaces/user.interfaces';
import { User } from '../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../constants/user.enum';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserStagingService implements IUserService {
  constructor(@InjectRepository(User, 'staging') private readonly userRepository: Repository<User>) {}

  async checkUserIsAdmin(uuid: string): Promise<{ isAdmin: boolean }> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.userRepository.findOneBy({ id: uuid });

        return resolve({ isAdmin: user.role === Role.Admin });
      } catch (error) {
        return reject(error);
      }
    });
  }

  async signup(email: string, password: string): Promise<{ id: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        const userEntity = this.userRepository.create({ email, password: hash });
        const user = await this.userRepository.save(userEntity);

        return resolve(user);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async validateUser(email: string, password: string): Promise<{ id: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.findOneByEmail(email);
        if (!user) throw new UnauthorizedException();

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new UnauthorizedException();

        return resolve(user);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async findOneByEmail(email: string): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.userRepository.findOneBy({ email });

        return resolve(user);
      } catch (error) {
        return reject(error);
      }
    });
  }
}
