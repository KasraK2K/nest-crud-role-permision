import { UserRepository } from './../user/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant/constant';
import { UserJwtStrategy } from './strategies/user.jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60h' },
    }),
  ],
  providers: [AuthService, UserService, UserJwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
