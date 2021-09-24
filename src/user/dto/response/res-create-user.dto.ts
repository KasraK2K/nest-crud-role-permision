import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResCreateUserDto {
  @Expose()
  first_name: string;

  id: number;
}
