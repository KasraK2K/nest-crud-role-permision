import { RegisterDto } from './../auth/dto/register.dto';
import { UserEntity } from './entities/user.entity';
import { EntityRepository, Repository, DeleteResult } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import * as _ from 'lodash';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async createUser(registerDto: RegisterDto): Promise<UserEntity> {
    try {
      const user = new UserEntity();
      Object.assign(user, registerDto);
      return await this.save(user);
    } catch (error) {
      if (error.code === '23505')
        throw new ConflictException('This user is already exist.');
      throw new InternalServerErrorException();
    }
  }

  async getAllUser(): Promise<UserEntity[]> {
    return await this.find({
      order: {
        created_at: 'ASC',
      },
    });
  }

  async getOneUser(username: string): Promise<UserEntity> {
    return await this.findOne({ username });
  }

  async updateUser(
    username: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const { password } = updateUserDto;
    const user = await this.getOneUser(username);
    _.assign(user, updateUserDto);
    if (password) user.password = await user.hash(password);
    return await this.save(user);
  }

  async softRemoveUser(userId: number): Promise<DeleteResult> {
    return await this.softDelete(userId);
  }
}
