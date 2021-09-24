import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateResDto {
  @Expose()
  name: string;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;

  @Expose()
  deleted_at: Date;

  @Expose()
  version: number;
}
