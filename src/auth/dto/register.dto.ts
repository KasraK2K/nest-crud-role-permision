import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterDto {
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
  @Length(6, 18)
  password: string;
}
