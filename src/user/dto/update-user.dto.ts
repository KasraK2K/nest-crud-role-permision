import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    type: String,
    example: 'Kasra',
    description: 'My friendly user name',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 32)
  @IsOptional()
  username: string;

  @ApiProperty({
    type: String,
    example: 'abc123',
    description: 'This password will be hash then save',
  })
  @IsString()
  @IsNotEmpty()
  @Length(6, 18)
  @IsOptional()
  password: string;
}
