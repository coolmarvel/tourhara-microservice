/**
 * 유저 서비스
 *
 * @author 이성현
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IUserService } from '../interfaces/user.interfaces';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * 유저 전체 조회
   */
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
