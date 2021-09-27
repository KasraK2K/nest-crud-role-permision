import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import {
  EntityRepository,
  Repository,
  UpdateResult,
  DeleteResult,
} from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      return await this.save(createUserDto);
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

  async getOneUser(userId: number): Promise<UserEntity> {
    return await this.findOne(userId);
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.update(userId, updateUserDto);
  }

  async softRemoveUser(userId: number): Promise<DeleteResult> {
    return await this.softDelete(userId);
  }
}
