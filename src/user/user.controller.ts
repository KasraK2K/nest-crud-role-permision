import { UserType } from './../common/enums/general.enum';
import { UserPermissionsEnum } from './../auth/enums/permission.enum';
import { UserGuard } from './../auth/guards/user.guard';
import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { DeleteResult } from 'typeorm';
import { Permissions } from 'src/auth/decorators/permissions.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @UseGuards(UserGuard, RolesGuard)
  @Roles(UserType.USER, UserType.ADMIN)
  @Permissions(UserPermissionsEnum.FIND)
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
