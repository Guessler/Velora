import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto.js';
import { UpdateAuthDto } from './dto/update-auth.dto.js';

@Injectable()
export class AuthService {
  register() {
    return 'register'
  }

  login() {
    return 'login'
  }

  logout() {
    return 'logout'
  }

  csrf() {
    return 'csrf'
  }

  refresh() {
    return 'refresh'
  }
}
