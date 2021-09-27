import { UserRepository } from './user.repository';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private repository: UserRepository,
  ) {}

  private readonly logger = new Logger(UserService.name);

  createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.repository.createUser(createUserDto);
  }

  getAllUser(): Promise<UserEntity[]> {
    return this.repository.getAllUser();
  }

  getOneUser(userId: number): Promise<UserEntity> {
    return this.repository.getOneUser(userId);
  }

  updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.repository.updateUser(userId, updateUserDto);
  }

  softRemoveUser(userId: number): Promise<DeleteResult> {
    return this.repository.softRemoveUser(userId);
  }
}
