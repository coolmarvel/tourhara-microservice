import { Injectable } from '@nestjs/common';
import { IUserService } from '../interfaces';
import { User } from '../entities';
import { UserRepository } from '../repositories';

/**
 * 유저 서비스
 *
 * @author 이성현
 */
@Injectable()
export class UserService implements IUserService {
  constructor(private userRepository: UserRepository) {}

  /**
   * 유저 전체 조회
   */
  getUsersAll(): Promise<User[]> {
    try {
      return this.userRepository.getUsersAll();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
