import { UserEntity } from 'src/user/entities/user.entity';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constant/constant';
import { IPayload } from '../interfaces/payload.interface';
import { UserService } from 'src/user/user.service';
import { UserType } from 'src/common/enums/general.enum';
import { StrategyName } from '../enums/strategy.enum';

@Injectable()
export class UserJwtStrategy extends PassportStrategy(
  Strategy,
  StrategyName.USER,
) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: IPayload): Promise<UserEntity> {
    const { username, role } = payload;
    let user;
    if (role === UserType.USER) {
      user = await this.userService.getOneUser(username);
    }
    if (user) return user;
  }
}
