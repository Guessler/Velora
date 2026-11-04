import { Controller, Get } from '@nestjs/common';
import { Can } from '@nestjs/authorization';
import { UserService } from './user.service.js';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Can.Anyone()
  @Get('me')
  getMe() {
    return this.userService.getMe();
  }
}
