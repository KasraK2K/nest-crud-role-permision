import { UserRepository } from './user.repository';
import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { DeleteResult } from 'typeorm';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private repository: UserRepository,
  ) {}

  private readonly logger = new Logger(UserService.name);

  createUser(registerDto: RegisterDto): Promise<UserEntity> {
    return this.repository.createUser(registerDto);
  }

  getAllUser(): Promise<UserEntity[]> {
    return this.repository.getAllUser();
  }

  getOneUser(username: string): Promise<UserEntity> {
    return this.repository.getOneUser(username);
  }

  updateUser(
    username: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.repository.updateUser(username, updateUserDto);
  }

  softRemoveUser(userId: number): Promise<DeleteResult> {
    return this.repository.softRemoveUser(userId);
  }
}
