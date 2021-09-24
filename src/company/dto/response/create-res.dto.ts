import { Exclude } from 'class-transformer';

export class CreateResDto {
  @Exclude()
  id: number;
}
