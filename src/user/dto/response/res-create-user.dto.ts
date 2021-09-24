import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

@Exclude()
export class ResCreateUserDto {
  @Expose()
  first_name: string;

  id: number;
}
