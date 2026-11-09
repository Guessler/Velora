
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
    // The key, issuer and audience come from the `accessToken` options.
    super({ realm: 'store' });
    // Adds this provider to the chain the guard runs for every request.
    registry.registerProvider(this);
  }

  // Called after the signature and claims checked out.
  // Returning null (the user was deleted) rejects the token.
  validate({ sub }: JwtClaims) {
    return sub ? this.userService.findById(sub) : null;
  }

  // `Authorization: Bearer` wins; otherwise the access token is read from the
  // HttpOnly cookie set by login/refresh, so Postman and browsers authenticate
  // without copying tokens by hand.
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
