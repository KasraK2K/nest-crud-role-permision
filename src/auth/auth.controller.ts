import { RegisterResDto } from './dto/response/register.res.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('/login')
  login(@Body(ValidationPipe) loginDto: LoginDto) {
    return this.service.login(loginDto);
  }

  @Post('/register')
  async register(
    @Body(ValidationPipe) registerDto: RegisterDto,
  ): Promise<RegisterResDto> {
    return plainToClass(
      RegisterResDto,
      await this.service.register(registerDto),
    );
  }
}
