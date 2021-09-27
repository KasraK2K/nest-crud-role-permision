import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { DeleteResult } from 'typeorm';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  getAllUser(): Promise<UserEntity[]> {
    return this.service.getAllUser();
  }

  @Get(':username')
  getOneUser(@Param('username') username: string): Promise<UserEntity> {
    return this.service.getOneUser(username);
  }

  @Patch(':username')
  updateUser(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.service.updateUser(username, updateUserDto);
  }

  @Delete(':userId')
  softRemoveUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<DeleteResult> {
    return this.service.softRemoveUser(userId);
  }
}
