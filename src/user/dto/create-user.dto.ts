import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    example: 'Kasra',
    description: 'my friendly user name',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 32)
  first_name: string;

  @ApiProperty({ type: Number, example: 1 })
  @IsNumber()
  @IsOptional()
  id: number;
}
