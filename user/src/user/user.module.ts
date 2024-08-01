import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { entities } from './entities';
import { UserService, RoleService } from './services';
import { UserController, RoleController } from './controllers';
import { UserRepository, RoleRepository, UserRoleMappingRepository } from './repositories';
import { RoleMapper, UserMapper, UserRoleMappingMapper } from './mappers';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [UserService, RoleService, UserRepository, RoleRepository, UserRoleMappingRepository, UserMapper, RoleMapper, UserRoleMappingMapper],
  exports: [UserService],
  controllers: [UserController, RoleController],
})
export class UserModule {}
