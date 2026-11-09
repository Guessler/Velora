import {
  Body,
  Controller,
  Headers,
  HttpCode,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { Public } from '@nestjs/authentication';
import { Throttle } from '@nestjs/throttler';

import { AuthService } from './auth.service.js';
import {
  REFRESH_COOKIE,
  clearAuthCookies,
  readCookie,
  setAuthCookies,
} from './auth-cookies.js';
import { RefreshTokenDto, SignInDto, SignUpDto } from './dto/auth.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Public()
  @Post('register')
  register(@Body() body: SignUpDto) {
    return this.authService.register(body);
  }

  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Public()
  @Post('login')
  @HttpCode(200)
  async login(
    @Body() body: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.login(body);
    setAuthCookies(res, tokens);
    return tokens;
  }

  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Public()
  @Post('logout')
  @HttpCode(200)
  logout(
    @Body() body: RefreshTokenDto,
    @Headers('x-refresh-token') headerToken: string | undefined,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = this.refreshTokenOf(body, headerToken, req);
    clearAuthCookies(res);
    return this.authService.logout(token);
  }

  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Public()
  @Post('refresh')
  @HttpCode(200)
  async refresh(
    @Body() body: RefreshTokenDto,
    @Headers('x-refresh-token') headerToken: string | undefined,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = this.refreshTokenOf(body, headerToken, req);
    const tokens = await this.authService.refresh(token);
    setAuthCookies(res, tokens);
    return tokens;
  }

  private refreshTokenOf(
    body: RefreshTokenDto | undefined,
    headerToken: string | undefined,
    req: Request,
  ): string {
    const token =
      body?.refreshToken ??
      headerToken ??
      readCookie(req.headers.cookie, REFRESH_COOKIE);

    if (!token) {
      throw new UnauthorizedException('Missing refresh token');
    }

    return token;
  }
}
