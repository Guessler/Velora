
import { type ExecutionContext, Injectable } from '@nestjs/common';
import { AuthenticationRegistry, JwtBearerProvider, type JwtClaims } from '@nestjs/authentication';
import { User } from '../user/entities/user.entity.js';
import { UserService } from '../user/user.service.js';
import { ACCESS_COOKIE, readCookie } from './auth-cookies.js';

declare module '@nestjs/authentication' {
  interface AuthenticationTypes {
    user: User;
  }
}

@Injectable()
export class JwtAuth extends JwtBearerProvider<User> {
  constructor(
    private readonly userService: UserService,
    registry: AuthenticationRegistry,
  ) {
    super({ realm: 'store' });
    registry.registerProvider(this);
  }

  validate({ sub }: JwtClaims) {
    return sub ? this.userService.findById(sub) : null;
  }

  async authenticate(context: ExecutionContext) {
    if (context.getType() === 'http') {
      const request = context
        .switchToHttp()
        .getRequest<{ headers: Record<string, string | undefined> }>();

      if (!request.headers.authorization) {
        const token = readCookie(request.headers.cookie, ACCESS_COOKIE);
        if (token) {
          request.headers.authorization = `Bearer ${token}`;
        }
      }
    }

    return super.authenticate(context);
  }
}
