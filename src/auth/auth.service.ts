import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserType } from 'src/common/enums/general.enum';
import { RegisterDto } from './dto/register.dto';
import { IPayload } from './interfaces/payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.validateUser(username, password);
    if (!user)
      throw new ForbiddenException('Your username or password is wrong.');
    const payload: IPayload = { username, role: UserType.USER };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto): Promise<UserEntity> {
    return this.userService.createUser(registerDto);
  }

  private async validateUser(
    username: string,
    password: string,
  ): Promise<UserEntity> {
    const user = await this.userService.getOneUser(username);
    if (user && user.comparePassword(password)) return user;
  }
}
