import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  UnauthorizedException,
} from '@nestjs/common';
import { Public } from '@nestjs/authentication';

import { AuthService } from './auth.service.js';
import { RefreshTokenDto, SignInDto, SignUpDto } from './dto/auth.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  register(@Body() body: SignUpDto) {
    return this.authService.register(body);
  }

  @Public()
  @Post('login')
  @HttpCode(200)
  async login(@Body() body: SignInDto) {
    const user = await this.authService.verify(body.email, body.password);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.authService.login(user);
  }

  @Public()
  @Post('logout')
  @HttpCode(200)
  logout(@Body() body: RefreshTokenDto) {
    return this.authService.logout(body.refreshToken);
  }

  @Public()
  @Get('csrf')
  csrf() {
    return this.authService.csrf();
  }

  @Public()
  @Post('refresh')
  @HttpCode(200)
  refresh(@Body() body: RefreshTokenDto) {
    return this.authService.refresh(body.refreshToken);
  }
}
