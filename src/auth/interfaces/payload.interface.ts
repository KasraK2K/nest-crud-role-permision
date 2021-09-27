import { UserType } from 'src/common/enums/general.enum';

export interface IPayload {
  username: string;
  role: UserType;
}
