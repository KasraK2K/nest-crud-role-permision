import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { ResCreateUserDto } from './dto/response/res-create-user.dto';
import { UserEntity } from './entities/user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  async createUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<ResCreateUserDto> {
    return plainToClass(
      ResCreateUserDto,
      await this.service.createUser(createUserDto),
    );
  }

  @Get()
  getAllUser(): Promise<UserEntity[]> {
    return this.service.getAllUser();
  }

  @Get(':userId')
  getOneUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<UserEntity> {
    return this.service.getOneUser(userId);
  }

  @Patch(':userId')
  updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.service.updateUser(userId, updateUserDto);
  }

  @Delete(':userId')
  softRemoveUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<DeleteResult> {
    return this.service.softRemoveUser(userId);
  }
}
