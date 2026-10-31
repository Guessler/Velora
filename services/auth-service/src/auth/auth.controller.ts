import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("register")
  register() {
    return this.authService.register();
  }

  @Post("login")
  login() {
    return this.authService.login();
  }

  @Post("logout")
  logout() {
    return this.authService.logout();
  }


  @Get("csrf")
  csrf() {
    return this.authService.csrf();
  }

  @Post("refresh")
  refresh() {
    return this.authService.refresh();
  }
}
