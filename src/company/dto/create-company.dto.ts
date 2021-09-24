import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({ type: String, example: 'ias' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
