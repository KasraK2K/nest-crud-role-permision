import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import * as config from 'config';

const userConfig = config.get('user');

export class LoginDto {
  @ApiProperty({
    type: String,
    example: 'Kasra',
    description: 'My friendly user name',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 32)
  username: string;

  @ApiProperty({
    type: String,
    example: 'abc123',
    description: 'This password will be hash then save',
  })
  @IsString()
  @IsNotEmpty()
  @Length(userConfig.password.min, userConfig.password.max)
  password: string;
}
