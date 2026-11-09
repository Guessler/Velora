import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from '@nestjs/authentication';
import { Can } from '@nestjs/authorization';
import { User } from './entities/user.entity.js';
import { UserService } from './user.service.js';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Can.Anyone()
  @Get('me')
  getMe(@CurrentUser() user: User) {
    return this.userService.getMe(user.id);
  }
}
