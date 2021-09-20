import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async createUser(createUserDto: CreateUserDto) {
    try {
      return await this.save(createUserDto);
    } catch (error) {
      if (error.code === '23505')
        throw new ConflictException('This user is already exist.');
      throw new InternalServerErrorException();
    }
  }
}
